import { createStorage } from './storage.js';

const STORAGE_KEYS = {
  TEXT: 'todotxt-lines',
  ORDER: 'todotxt-order',
  UI: 'todotxt-ui'
};
const storage = createStorage(() => window.localStorage);

const QUICK_FILTERS = [
  { id: 'all', label: 'Alle', description: 'Alle Aufgaben', fn: () => true },
  { id: 'today', label: 'Heute', description: 'Fällig heute', fn: task => {
    if (!task.due) return false;
    const today = formatDate(new Date());
    return task.due === today && !task.completed;
  } },
  { id: 'overdue', label: 'Überfällig', description: 'Fälligkeit überschritten', fn: task => {
    if (!task.due || task.completed) return false;
    return task.due < formatDate(new Date());
  } },
  { id: 'next7', label: 'Nächste 7 Tage', description: 'In den kommenden 7 Tagen fällig', fn: task => {
    if (!task.due || task.completed) return false;
    const today = new Date();
    const due = parseISO(task.due);
    const diff = (due - today) / (1000 * 60 * 60 * 24);
    return diff >= -0.5 && diff <= 7;
  } },
  { id: 'nodue', label: 'Ohne Due', description: 'Keine Fälligkeit', fn: task => !task.due && !task.completed },
  { id: 'prioA', label: 'Priorität (A)', description: 'Priorität A', fn: task => task.priority === 'A' && !task.completed },
  { id: 'completed', label: 'Erledigt', description: 'Abgeschlossene Aufgaben', fn: task => task.completed }
];

const SORT_PRESETS = {
  default: 'is:open desc:prio asc:due asc:project asc:created',
  'asc:due asc:prio': 'asc:due asc:prio',
  'desc:created': 'desc:created'
};

const NATURAL_SNIPPETS = [
  { match: /^!a\b/, replace: '(A)' },
  { match: /^!b\b/, replace: '(B)' },
  { match: /^tom\b/, handler: () => `due:${shiftDate(new Date(), { days: 1 })}` },
  { match: /^tod\b/, handler: () => `due:${formatDate(new Date())}` }
];

function parseNaturalSnippets(text) {
  return text.split(/\s+/).map(word => {
    for (const snippet of NATURAL_SNIPPETS) {
      if (snippet.match.test(word)) {
        if (snippet.replace) return snippet.replace;
        return snippet.handler();
      }
    }
    if (/^#\w+/.test(word)) {
      return word.replace(/^#/, '+');
    }
    if (/^next\b/i.test(word)) {
      return interpretNaturalDate(word);
    }
    if (/^in\s*\d+[dwmy]$/i.test(word)) {
      const [, num, unit] = word.match(/in\s*(\d+)([dwmy])/i);
      return `due:${shiftDate(new Date(), intervalToObject(`${num}${unit}`))}`;
    }
    return word;
  }).join(' ');
}

function interpretNaturalDate(word) {
  const today = new Date();
  const map = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 0 };
  const match = word.match(/^next\s+(mon|tue|wed|thu|fri|sat|sun)/i);
  if (!match) return word;
  const target = map[match[1].slice(0, 3).toLowerCase()];
  const day = today.getDay();
  let diff = target - day;
  if (diff <= 0) diff += 7;
  return `due:${formatDate(shiftDate(today, { days: diff }))}`;
}

function parseISO(str) {
  if (!str) return null;
  const [year, month, day] = str.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function formatDate(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return d.toISOString().slice(0, 10);
}

function shiftDate(date, { days = 0, weeks = 0, months = 0, years = 0 }) {
  const result = new Date(date);
  if (years) result.setFullYear(result.getFullYear() + years);
  if (months) {
    const month = result.getMonth() + months;
    const day = result.getDate();
    result.setMonth(month);
    if (result.getDate() !== day) {
      result.setDate(0);
    }
  }
  const totalDays = days + weeks * 7;
  if (totalDays) result.setDate(result.getDate() + totalDays);
  return result;
}

function intervalToObject(value) {
  const match = value?.match(/(\d+)([dwmy])/);
  if (!match) return {};
  const amount = Number(match[1]);
  const unit = match[2];
  switch (unit) {
    case 'd':
      return { days: amount };
    case 'w':
      return { weeks: amount };
    case 'm':
      return { months: amount };
    case 'y':
      return { years: amount };
    default:
      return {};
  }
}

function generateId() {
  if (window.crypto?.randomUUID) {
    return crypto.randomUUID();
  }
  return 'id-' + Math.random().toString(36).slice(2, 10);
}

function parseLines(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  return lines.map((line, index) => parseTask(line, index)).filter(Boolean);
}

function isISODate(token) {
  return /^\d{4}-\d{2}-\d{2}$/.test(token);
}

function parseTask(line, index = 0) {
  const trimmed = line.trim();
  if (!trimmed) return null;
  const tokens = trimmed.split(/\s+/);
  let idx = 0;
  let completed = false;
  let completionDate = '';
  let creationDate = '';
  let priority = '';
  if (tokens[idx] === 'x') {
    completed = true;
    idx++;
    if (isISODate(tokens[idx])) {
      completionDate = tokens[idx];
      idx++;
    }
    if (isISODate(tokens[idx])) {
      creationDate = tokens[idx];
      idx++;
    }
  } else if (/^\([A-Z]\)$/.test(tokens[idx])) {
    priority = tokens[idx].slice(1, 2);
    idx++;
    if (isISODate(tokens[idx])) {
      creationDate = tokens[idx];
      idx++;
    }
  } else if (isISODate(tokens[idx])) {
    creationDate = tokens[idx];
    idx++;
  }
  const bodyTokens = tokens.slice(idx);
  const bodyOrder = [];
  const descriptionTokens = [];
  const projects = [];
  const contexts = [];
  const metadata = {};
  const metadataOrder = [];
  for (const token of bodyTokens) {
    if (token.startsWith('+') && token.length > 1) {
      const value = token.slice(1);
      projects.push(value);
      bodyOrder.push({ type: 'project', value });
    } else if (token.startsWith('@') && token.length > 1) {
      const value = token.slice(1);
      contexts.push(value);
      bodyOrder.push({ type: 'context', value });
    } else if (token.includes(':')) {
      const colonIndex = token.indexOf(':');
      const key = token.slice(0, colonIndex);
      const value = token.slice(colonIndex + 1);
      metadata[key] = value;
      metadataOrder.push(key);
      bodyOrder.push({ type: 'metadata', key });
    } else {
      descriptionTokens.push(token);
      bodyOrder.push({ type: 'text', value: token });
    }
  }
  let id = metadata.id;
  if (!id) {
    id = generateId();
    metadata.id = id;
    metadataOrder.push('id');
    bodyOrder.push({ type: 'metadata', key: 'id' });
  }
  const text = descriptionTokens.join(' ');
  return {
    id,
    raw: line,
    tokens,
    bodyOrder,
    descriptionTokens,
    projects,
    contexts,
    metadata,
    metadataOrder,
    text,
    completed,
    completionDate,
    creationDate,
    priority,
    due: metadata.due || '',
    threshold: metadata.t || '',
    recurrence: metadata.rec || '',
    order: index,
    originalIndex: index
  };
}

function serializeTask(task) {
  const tokens = [];
  if (task.completed) {
    tokens.push('x');
    if (task.completionDate) tokens.push(task.completionDate);
    if (task.creationDate) tokens.push(task.creationDate);
  } else {
    if (task.priority) tokens.push(`(${task.priority})`);
    if (task.creationDate) tokens.push(task.creationDate);
  }
  for (const entry of task.bodyOrder) {
    switch (entry.type) {
      case 'text':
        if (entry.value) tokens.push(entry.value);
        break;
      case 'project':
        tokens.push(`+${entry.value}`);
        break;
      case 'context':
        tokens.push(`@${entry.value}`);
        break;
      case 'metadata': {
        const value = task.metadata[entry.key];
        if (value !== undefined && value !== '') {
          tokens.push(`${entry.key}:${value}`);
        }
        break;
      }
      default:
        break;
    }
  }
  return tokens.join(' ');
}

function addCompletionComment(task, completionDate) {
  const marker = `// completed: ${completionDate}`;
  if (serializeTask(task).includes(marker)) return;
  task.bodyOrder.push({ type: 'text', value: '//' });
  task.bodyOrder.push({ type: 'text', value: 'completed:' });
  task.bodyOrder.push({ type: 'text', value: completionDate });
  task.descriptionTokens.push('//', 'completed:', completionDate);
  task.text = task.descriptionTokens.join(' ');
}

function applyRecurrence(task, completionDate) {
  const rec = task.metadata.rec;
  if (!rec) return null;
  const interval = intervalToObject(rec);
  if (!interval) return null;
  addCompletionComment(task, completionDate);
  const clone = JSON.parse(JSON.stringify(task));
  clone.completed = false;
  clone.completionDate = '';
  clone.creationDate = formatDate(new Date());
  clone.metadata = { ...task.metadata };
  clone.metadata.id = generateId();
  clone.id = clone.metadata.id;
  clone.metadataOrder = Array.from(new Set([...task.metadataOrder.filter(k => k !== 'id'), 'id']));
  clone.bodyOrder = task.bodyOrder.filter(entry => !(entry.type === 'metadata' && entry.key === 'id'));
  clone.bodyOrder.push({ type: 'metadata', key: 'id' });
  if (task.due) {
    const newDue = shiftDate(parseISO(task.due) || new Date(), interval);
    clone.metadata.due = formatDate(newDue);
  }
  if (task.threshold) {
    const newThreshold = shiftDate(parseISO(task.threshold) || new Date(), interval);
    clone.metadata.t = formatDate(newThreshold);
  }
  clone.due = clone.metadata.due || '';
  clone.threshold = clone.metadata.t || '';
  clone.text = task.text;
  clone.descriptionTokens = [...task.descriptionTokens];
  return clone;
}

class TaskStore {
  constructor() {
    this.tasks = [];
  }

  loadFromText(text, strategy = 'replace') {
    const incoming = parseLines(text);
    if (strategy === 'replace') {
      this.tasks = incoming;
    } else if (strategy === 'append') {
      const ids = new Set(this.tasks.map(task => task.id));
      for (const task of incoming) {
        if (!ids.has(task.id)) this.tasks.push(task);
      }
    } else if (strategy === 'dedupe') {
      const map = new Map();
      for (const task of [...this.tasks, ...incoming]) {
        map.set(task.id, task);
      }
      this.tasks = Array.from(map.values());
    }
    this.tasks.forEach((task, index) => {
      task.order = index;
    });
    this.persist();
  }

  persist() {
    const text = this.tasks.map(task => serializeTask(task)).join('\n');
    storage.set(STORAGE_KEYS.TEXT, text);
  }

  exportText() {
    return this.tasks.map(task => serializeTask(task)).join('\n');
  }

  addTaskFromText(text) {
    const task = parseTask(text, this.tasks.length);
    if (!task) return null;
    this.tasks.push(task);
    this.persist();
    return task;
  }

  toggleCompleted(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;
    task.completed = !task.completed;
    const today = formatDate(new Date());
    if (task.completed) {
      task.completionDate = today;
      const recTask = applyRecurrence(task, today);
      if (recTask) {
        recTask.order = this.tasks.length;
        this.tasks.push(recTask);
      }
    } else {
      task.completionDate = '';
    }
    this.persist();
  }

  setPriority(id, priority) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;
    task.priority = priority;
    this.persist();
  }

  updateMetadata(id, key, value) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;
    if (!value) {
      delete task.metadata[key];
      task.bodyOrder = task.bodyOrder.filter(entry => !(entry.type === 'metadata' && entry.key === key));
      task.metadataOrder = (task.metadataOrder || []).filter(existing => existing !== key);
    } else {
      task.metadata[key] = value;
      if (!task.bodyOrder.some(entry => entry.type === 'metadata' && entry.key === key)) {
        task.bodyOrder.push({ type: 'metadata', key });
      }
      if (!task.metadataOrder) task.metadataOrder = [];
      if (!task.metadataOrder.includes(key)) task.metadataOrder.push(key);
    }
    if (key === 'due') task.due = value || '';
    if (key === 't') task.threshold = value || '';
    if (key === 'rec') task.recurrence = value || '';
    this.persist();
  }

  updateDescription(id, text) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;
    const tokens = text.split(/\s+/).filter(Boolean);
    task.descriptionTokens = tokens;
    task.text = tokens.join(' ');
    const others = task.bodyOrder.filter(entry => entry.type !== 'text');
    task.bodyOrder = [];
    tokens.forEach(token => task.bodyOrder.push({ type: 'text', value: token }));
    task.bodyOrder.push(...others);
    this.persist();
  }

  reorder(draggedId, targetId) {
    const draggedIndex = this.tasks.findIndex(task => task.id === draggedId);
    const targetIndex = this.tasks.findIndex(task => task.id === targetId);
    if (draggedIndex === -1 || targetIndex === -1) return;
    const [dragged] = this.tasks.splice(draggedIndex, 1);
    this.tasks.splice(targetIndex, 0, dragged);
    this.tasks.forEach((task, index) => {
      task.order = index;
    });
    this.persist();
  }
}

function hashLine(line) {
  let hash = 0;
  for (let i = 0; i < line.length; i++) {
    hash = (hash << 5) - hash + line.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}

function parseFilterQuery(query) {
  const regex = /"([^"]+)"|'([^']+)'|(\S+)/g;
  const tokens = [];
  let match;
  while ((match = regex.exec(query)) !== null) {
    tokens.push(match[1] || match[2] || match[3]);
  }
  const filter = {
    text: [],
    includeProjects: new Set(),
    excludeProjects: new Set(),
    includeContexts: new Set(),
    excludeContexts: new Set(),
    priorityRange: null,
    has: new Set(),
    is: new Set(),
    metadata: new Map()
  };
  for (const token of tokens) {
    if (token.startsWith('prio:')) {
      const range = token.slice(5).replace(/[()]/g, '');
      const [min, max] = range.split('-');
      filter.priorityRange = { min: min?.toUpperCase(), max: (max || min)?.toUpperCase() };
    } else if (token.startsWith('+')) {
      filter.includeProjects.add(token.slice(1));
    } else if (token.startsWith('-+')) {
      filter.excludeProjects.add(token.slice(2));
    } else if (token.startsWith('@')) {
      filter.includeContexts.add(token.slice(1));
    } else if (token.startsWith('-@')) {
      filter.excludeContexts.add(token.slice(2));
    } else if (token.startsWith('has:')) {
      filter.has.add(token.slice(4));
    } else if (token.startsWith('is:')) {
      filter.is.add(token.slice(3));
    } else if (token.includes(':')) {
      const [key, value] = token.split(':');
      filter.metadata.set(key, value);
    } else {
      filter.text.push(token.toLowerCase());
    }
  }
  return filter;
}

function matchesFilter(task, filter) {
  if (!filter) return true;
  const raw = serializeTask(task).toLowerCase();
  for (const word of filter.text) {
    if (!raw.includes(word)) return false;
  }
  if (filter.includeProjects.size && !task.projects.some(project => filter.includeProjects.has(project))) {
    return false;
  }
  if (filter.excludeProjects.size && task.projects.some(project => filter.excludeProjects.has(project))) {
    return false;
  }
  if (filter.includeContexts.size && !task.contexts.some(context => filter.includeContexts.has(context))) {
    return false;
  }
  if (filter.excludeContexts.size && task.contexts.some(context => filter.excludeContexts.has(context))) {
    return false;
  }
  if (filter.priorityRange) {
    if (!task.priority) return false;
    const { min, max } = filter.priorityRange;
    if (task.priority < min || task.priority > max) return false;
  }
  for (const key of filter.has) {
    if (key === 'due' && !task.due) return false;
    if (key === 't' && !task.threshold) return false;
    if (key === 'project' && task.projects.length === 0) return false;
    if (key === 'context' && task.contexts.length === 0) return false;
  }
  for (const key of filter.is) {
    if (key === 'open' && task.completed) return false;
    if (key === 'closed' && !task.completed) return false;
  }
  for (const [key, value] of filter.metadata.entries()) {
    if ((task.metadata[key] || '').toLowerCase() !== value.toLowerCase()) return false;
  }
  return true;
}

function parseSortString(sortString) {
  return sortString.split(/\s+/).filter(Boolean).map(token => {
    const [dir, field] = token.includes(':') ? token.split(':') : ['asc', token];
    if (dir === 'asc' || dir === 'desc') {
      return { dir, field };
    }
    return { dir: 'asc', field: dir };
  });
}

function compareTasks(sorters, a, b) {
  for (const { dir, field } of sorters) {
    let cmp = 0;
    switch (field) {
      case 'prio':
        cmp = (a.priority || 'Z').localeCompare(b.priority || 'Z');
        break;
      case 'due':
        cmp = (a.due || '').localeCompare(b.due || '');
        break;
      case 'project':
        cmp = (a.projects[0] || '').localeCompare(b.projects[0] || '');
        break;
      case 'created':
        cmp = (a.creationDate || '').localeCompare(b.creationDate || '');
        break;
      case 'open':
      case 'is':
        cmp = Number(a.completed) - Number(b.completed);
        break;
      default:
        cmp = a.order - b.order;
        break;
    }
    if (cmp !== 0) return dir === 'asc' ? cmp : -cmp;
  }
  return a.order - b.order;
}

const store = new TaskStore();
const state = {
  quickFilter: 'all',
  filterQuery: '',
  sort: SORT_PRESETS.default,
  savedViews: [],
  selectedIds: new Set(),
  lastFocusedTaskId: null
};

function loadState() {
  const text = storage.get(STORAGE_KEYS.TEXT);
  if (text) {
    store.loadFromText(text, 'replace');
  } else {
    fetch('todo.txt').then(res => res.text()).then(content => {
      store.loadFromText(content, 'replace');
      render();
    }).catch(error => {
      console.warn('Konnte todo.txt nicht laden.', error);
      render();
    });
  }
  const ui = storage.get(STORAGE_KEYS.UI);
  if (ui) {
    try {
      const parsed = JSON.parse(ui);
      state.quickFilter = parsed.quickFilter || 'all';
      state.filterQuery = parsed.filterQuery || '';
      state.sort = parsed.sort || SORT_PRESETS.default;
      state.savedViews = parsed.savedViews || [];
      document.getElementById('search-input').value = state.filterQuery;
      document.getElementById('sort-select').value = Object.keys(SORT_PRESETS).find(key => SORT_PRESETS[key] === state.sort) || 'default';
    } catch (err) {
      console.warn('UI state konnte nicht geladen werden', err);
    }
  }
}

function persistUIState() {
  storage.set(STORAGE_KEYS.UI, JSON.stringify({
    quickFilter: state.quickFilter,
    filterQuery: state.filterQuery,
    sort: state.sort,
    savedViews: state.savedViews
  }));
}

function getFilteredTasks() {
  const quick = QUICK_FILTERS.find(item => item.id === state.quickFilter) || QUICK_FILTERS[0];
  const query = state.filterQuery ? parseFilterQuery(state.filterQuery) : null;
  const filtered = store.tasks.filter(task => quick.fn(task) && matchesFilter(task, query));
  const sorters = parseSortString(state.sort);
  return filtered.sort((a, b) => compareTasks(sorters, a, b));
}

function aggregateCounts(tasks, key) {
  const map = new Map();
  for (const task of tasks) {
    for (const value of task[key]) {
      map.set(value, (map.get(value) || 0) + 1);
    }
  }
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
}

function renderSidebar() {
  const quickFilters = document.getElementById('quick-filters');
  quickFilters.innerHTML = '';
  for (const filter of QUICK_FILTERS) {
    const button = document.createElement('button');
    button.textContent = filter.label;
    button.dataset.filterId = filter.id;
    button.title = filter.description;
    const count = store.tasks.filter(filter.fn).length;
    const counter = document.createElement('span');
    counter.textContent = count;
    button.appendChild(counter);
    if (state.quickFilter === filter.id) button.classList.add('active');
    quickFilters.appendChild(button);
  }
  const savedViews = document.getElementById('saved-views');
  savedViews.innerHTML = '';
  state.savedViews.forEach((view, index) => {
    const button = document.createElement('button');
    button.textContent = `${index + 1}. ${view.name}`;
    button.dataset.viewIndex = index;
    if (view.quickFilter === state.quickFilter && view.query === state.filterQuery) button.classList.add('active');
    savedViews.appendChild(button);
  });
  const projectsList = document.getElementById('projects-list');
  projectsList.innerHTML = '';
  for (const [project, count] of aggregateCounts(store.tasks, 'projects')) {
    const button = document.createElement('button');
    button.textContent = `+${project}`;
    button.dataset.project = project;
    const counter = document.createElement('span');
    counter.textContent = count;
    button.appendChild(counter);
    projectsList.appendChild(button);
  }
  const contextsList = document.getElementById('contexts-list');
  contextsList.innerHTML = '';
  for (const [context, count] of aggregateCounts(store.tasks, 'contexts')) {
    const button = document.createElement('button');
    button.textContent = `@${context}`;
    button.dataset.context = context;
    const counter = document.createElement('span');
    counter.textContent = count;
    button.appendChild(counter);
    contextsList.appendChild(button);
  }
}

function renderTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = '';
  const template = document.getElementById('task-item-template');
  const fragment = document.createDocumentFragment();
  const tasks = getFilteredTasks();
  tasks.forEach(task => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.dataset.id = task.id;
    node.setAttribute('aria-selected', state.selectedIds.has(task.id) ? 'true' : 'false');
    const checkbox = node.querySelector('.task-toggle');
    checkbox.checked = task.completed;
    const title = node.querySelector('.task-title');
    title.value = task.text;
    title.placeholder = '(kein Titel)';
    title.classList.toggle('completed', task.completed);
    const priority = node.querySelector('.priority-badge');
    priority.dataset.priority = task.priority || '';
    priority.textContent = task.priority || '';
    const tags = node.querySelector('.task-tags');
    tags.innerHTML = '';
    task.projects.forEach(project => {
      const span = document.createElement('span');
      span.className = 'tag-chip';
      span.textContent = `+${project}`;
      tags.appendChild(span);
    });
    task.contexts.forEach(context => {
      const span = document.createElement('span');
      span.className = 'tag-chip';
      span.textContent = `@${context}`;
      tags.appendChild(span);
    });
    const badges = node.querySelector('.task-badges');
    badges.innerHTML = '';
    if (task.due) {
      const due = document.createElement('span');
      due.className = 'badge';
      due.textContent = `due ${task.due}`;
      const today = formatDate(new Date());
      if (!task.completed && task.due < today) due.classList.add('overdue');
      if (!task.completed && task.due === today) due.classList.add('today');
      badges.appendChild(due);
    }
    if (task.threshold) {
      const t = document.createElement('span');
      t.className = 'badge threshold';
      t.textContent = `t ${task.threshold}`;
      badges.appendChild(t);
    }
    if (task.metadata.rec) {
      const rec = document.createElement('span');
      rec.className = 'badge';
      rec.textContent = `rec ${task.metadata.rec}`;
      badges.appendChild(rec);
    }
    const meta = node.querySelector('.task-meta');
    const rest = Object.entries(task.metadata)
      .filter(([key]) => !['due', 't', 'rec', 'id'].includes(key))
      .map(([key, value]) => `${key}:${value}`);
    meta.textContent = rest.join(' ');
    meta.title = serializeTask(task);
    fragment.appendChild(node);
  });
  list.appendChild(fragment);
  updateStats(tasks);
}

function renderInspector() {
  const inspector = document.getElementById('inspector-content');
  inspector.innerHTML = '';
  const [first] = Array.from(state.selectedIds);
  if (!first) {
    inspector.textContent = 'Keine Aufgabe ausgewählt.';
    return;
  }
  const task = store.tasks.find(t => t.id === first);
  if (!task) return;
  const title = document.createElement('h2');
  title.textContent = task.text || '(kein Titel)';
  inspector.appendChild(title);
  const grid = document.createElement('dl');
  grid.className = 'meta-grid';
  const pairs = [
    ['Priorität', task.priority || '–'],
    ['Erstellt', task.creationDate || '–'],
    ['Fällig', task.due || '–'],
    ['Threshold', task.threshold || '–'],
    ['Rec', task.metadata.rec || '–'],
    ['ID', task.id]
  ];
  pairs.forEach(([label, value]) => {
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.textContent = value;
    grid.appendChild(dt);
    grid.appendChild(dd);
  });
  inspector.appendChild(grid);
  const raw = document.createElement('pre');
  raw.textContent = serializeTask(task);
  inspector.appendChild(raw);
}

function updateStats(tasks) {
  const stats = document.getElementById('stats');
  const open = tasks.filter(task => !task.completed).length;
  const done = tasks.filter(task => task.completed).length;
  const priorityA = tasks.filter(task => task.priority === 'A').length;
  stats.textContent = `Offen: ${open} · Erledigt: ${done} · (A): ${priorityA}`;
}

function render() {
  renderSidebar();
  renderTasks();
  renderInspector();
  persistUIState();
}

function setStatus(text) {
  document.getElementById('status-info').textContent = text;
}

function initEvents() {
  const quickAddInput = document.getElementById('quick-add-input');
  const quickAddButton = document.getElementById('quick-add-btn');
  const preview = document.getElementById('quick-add-preview');
  quickAddInput.addEventListener('input', () => {
    const text = quickAddInput.value.trim();
    if (!text) {
      preview.textContent = '';
      return;
    }
    const parsed = parseTask(parseNaturalSnippets(text), store.tasks.length);
    preview.textContent = parsed ? `→ ${serializeTask(parsed)}` : 'Format nicht erkannt';
  });
  function submitQuickAdd() {
    const text = quickAddInput.value.trim();
    if (!text) return;
    const finalText = parseNaturalSnippets(text);
    const parsed = parseTask(finalText, store.tasks.length);
    if (!parsed) {
      setStatus('Aufgabe konnte nicht geparst werden.');
      return;
    }
    store.addTaskFromText(finalText);
    quickAddInput.value = '';
    preview.textContent = '';
    render();
    setStatus('Aufgabe hinzugefügt.');
  }
  quickAddButton.addEventListener('click', submitQuickAdd);
  quickAddInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') submitQuickAdd();
  });

  document.getElementById('quick-filters').addEventListener('click', event => {
    const button = event.target.closest('button[data-filter-id]');
    if (!button) return;
    state.quickFilter = button.dataset.filterId;
    render();
  });

  document.getElementById('saved-views').addEventListener('click', event => {
    const button = event.target.closest('button[data-view-index]');
    if (!button) return;
    const view = state.savedViews[Number(button.dataset.viewIndex)];
    if (!view) return;
    state.quickFilter = view.quickFilter;
    state.filterQuery = view.query;
    document.getElementById('search-input').value = state.filterQuery;
    render();
  });

  document.getElementById('projects-list').addEventListener('click', event => {
    const button = event.target.closest('button[data-project]');
    if (!button) return;
    state.filterQuery = `+${button.dataset.project}`;
    document.getElementById('search-input').value = state.filterQuery;
    render();
  });

  document.getElementById('contexts-list').addEventListener('click', event => {
    const button = event.target.closest('button[data-context]');
    if (!button) return;
    state.filterQuery = `@${button.dataset.context}`;
    document.getElementById('search-input').value = state.filterQuery;
    render();
  });

  document.getElementById('search-input').addEventListener('input', event => {
    state.filterQuery = event.target.value;
    render();
  });

  document.getElementById('sort-select').addEventListener('change', event => {
    const value = event.target.value;
    state.sort = SORT_PRESETS[value] || value;
    render();
  });

  document.getElementById('task-list').addEventListener('click', event => {
    const item = event.target.closest('.task-item');
    if (!item) return;
    const id = item.dataset.id;
    if (event.target.classList.contains('task-toggle')) return;
    if (event.target.classList.contains('task-more')) return;
    handleSelection(id, event);
  });

  document.getElementById('task-list').addEventListener('change', event => {
    if (!event.target.classList.contains('task-toggle')) return;
    const item = event.target.closest('.task-item');
    store.toggleCompleted(item.dataset.id);
    render();
  });

  document.getElementById('task-list').addEventListener('keydown', event => {
    if (event.target.classList.contains('task-title') && event.key === 'Enter') {
      event.preventDefault();
      event.target.blur();
    }
  });

  document.getElementById('task-list').addEventListener('focusout', event => {
    if (!event.target.classList.contains('task-title')) return;
    const item = event.target.closest('.task-item');
    const id = item.dataset.id;
    const task = store.tasks.find(t => t.id === id);
    if (!task) return;
    const value = event.target.value.trim();
    if (value !== task.text) {
      store.updateDescription(id, value);
      setStatus('Aufgabe aktualisiert.');
      render();
    }
  });

  document.getElementById('save-current-view').addEventListener('click', () => {
    const name = prompt('Name der Ansicht');
    if (!name) return;
    state.savedViews.push({ name, query: state.filterQuery, quickFilter: state.quickFilter });
    if (state.savedViews.length > 5) state.savedViews = state.savedViews.slice(-5);
    render();
  });

  setupDragAndDrop();
  setupBulkActions();
  setupImportExport();
  setupContextMenu();
  setupKeyboardShortcuts();
  setupThemeToggle();
  setupDropImport();
  registerServiceWorker();
}

function handleSelection(id, event) {
  if (event.metaKey || event.ctrlKey) {
    if (state.selectedIds.has(id)) state.selectedIds.delete(id);
    else state.selectedIds.add(id);
  } else if (event.shiftKey) {
    const tasks = getFilteredTasks();
    const ids = tasks.map(task => task.id);
    const last = state.lastFocusedTaskId ? ids.indexOf(state.lastFocusedTaskId) : 0;
    const current = ids.indexOf(id);
    if (current !== -1 && last !== -1) {
      const [start, end] = [last, current].sort((a, b) => a - b);
      state.selectedIds = new Set(ids.slice(start, end + 1));
    }
  } else {
    state.selectedIds = new Set([id]);
  }
  state.lastFocusedTaskId = id;
  render();
}

function setupDragAndDrop() {
  const list = document.getElementById('task-list');
  let draggedId = null;
  list.addEventListener('dragstart', event => {
    const item = event.target.closest('.task-item');
    if (!item) return;
    draggedId = item.dataset.id;
    event.dataTransfer.effectAllowed = 'move';
  });
  list.addEventListener('dragover', event => {
    event.preventDefault();
    const item = event.target.closest('.task-item');
    if (!item || item.dataset.id === draggedId) return;
    item.classList.add('drag-over');
  });
  list.addEventListener('dragleave', event => {
    const item = event.target.closest('.task-item');
    if (item) item.classList.remove('drag-over');
  });
  list.addEventListener('drop', event => {
    event.preventDefault();
    const item = event.target.closest('.task-item');
    if (!item) return;
    item.classList.remove('drag-over');
    if (draggedId && item.dataset.id !== draggedId) {
      store.reorder(draggedId, item.dataset.id);
      render();
    }
  });
}

function setupBulkActions() {
  document.querySelector('.bulk-actions').addEventListener('click', event => {
    const button = event.target.closest('button[data-bulk]');
    if (!button) return;
    const ids = Array.from(state.selectedIds);
    if (!ids.length) {
      alert('Bitte zuerst Aufgaben auswählen.');
      return;
    }
    switch (button.dataset.bulk) {
      case 'complete':
        ids.forEach(id => store.toggleCompleted(id));
        break;
      case 'priority': {
        const priority = prompt('Neue Priorität (A-Z, leer für keine)');
        if (priority !== null) ids.forEach(id => store.setPriority(id, priority.toUpperCase().slice(0, 1)));
        break;
      }
      case 'due': {
        const due = prompt('Fälligkeitsdatum (YYYY-MM-DD, leer für keine)');
        ids.forEach(id => store.updateMetadata(id, 'due', due || ''));
        break;
      }
      case 'project': {
        const project = prompt('Projekt: +Name hinzufügen, -+Name entfernen');
        if (!project) break;
        ids.forEach(id => updateProjectOrContext(id, project, true));
        break;
      }
      case 'context': {
        const context = prompt('Kontext: @Name hinzufügen, -@Name entfernen');
        if (!context) break;
        ids.forEach(id => updateProjectOrContext(id, context, false));
        break;
      }
      default:
        break;
    }
    render();
  });
}

function updateProjectOrContext(id, token, isProject) {
  const task = store.tasks.find(t => t.id === id);
  if (!task) return;
  const prefix = isProject ? '+' : '@';
  const removePrefix = '-' + prefix;
  if (token.startsWith(removePrefix)) {
    const value = token.slice(removePrefix.length);
    task.bodyOrder = task.bodyOrder.filter(entry => !(entry.type === (isProject ? 'project' : 'context') && entry.value === value));
    if (isProject) task.projects = task.projects.filter(p => p !== value);
    else task.contexts = task.contexts.filter(c => c !== value);
  } else if (token.startsWith(prefix)) {
    const value = token.slice(1);
    task.bodyOrder.push({ type: isProject ? 'project' : 'context', value });
    if (isProject && !task.projects.includes(value)) task.projects.push(value);
    if (!isProject && !task.contexts.includes(value)) task.contexts.push(value);
  }
  store.persist();
}

function setupImportExport() {
  const fileInput = document.getElementById('file-input');
  document.getElementById('import-btn').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', event => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const strategy = prompt('Strategie: replace | append | dedupe', 'dedupe');
      store.loadFromText(e.target.result, strategy || 'dedupe');
      render();
    };
    reader.readAsText(file);
  });
  document.getElementById('export-btn').addEventListener('click', () => {
    const text = store.exportText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'todo.txt';
    a.click();
    URL.revokeObjectURL(url);
  });
}

function setupContextMenu() {
  const menu = document.getElementById('context-menu');
  let currentId = null;
  document.getElementById('task-list').addEventListener('contextmenu', event => {
    event.preventDefault();
    const item = event.target.closest('.task-item');
    if (!item) return;
    currentId = item.dataset.id;
    menu.style.top = `${event.clientY}px`;
    menu.style.left = `${event.clientX}px`;
    menu.hidden = false;
  });
  document.addEventListener('click', () => {
    menu.hidden = true;
  });
  menu.addEventListener('click', event => {
    const action = event.target.dataset.action;
    if (!action) return;
    const task = store.tasks.find(t => t.id === currentId);
    if (!task) return;
    switch (action) {
      case 'duplicate': {
        const copy = JSON.parse(JSON.stringify(task));
        copy.id = generateId();
        copy.metadata.id = copy.id;
        copy.bodyOrder = copy.bodyOrder.filter(entry => !(entry.type === 'metadata' && entry.key === 'id'));
        copy.bodyOrder.push({ type: 'metadata', key: 'id' });
        copy.metadataOrder = Array.from(new Set([...(copy.metadataOrder || []).filter(k => k !== 'id'), 'id']));
        copy.order = store.tasks.length;
        store.tasks.push(copy);
        break;
      }
      case 'copy-link': {
        const url = new URL(window.location);
        url.searchParams.set('id', task.id);
        navigator.clipboard?.writeText(url.toString());
        setStatus('Link kopiert.');
        break;
      }
      case 'open': {
        const url = new URL(window.location);
        url.searchParams.set('id', task.id);
        window.open(url.toString(), '_blank');
        break;
      }
      default:
        break;
    }
    store.persist();
    render();
  });
}

function setupKeyboardShortcuts() {
  document.addEventListener('keydown', event => {
    if (event.target.matches('input, textarea')) return;
    switch (event.key) {
      case 'a':
      case 'n':
        document.getElementById('quick-add-input').focus();
        break;
      case 'f':
      case '/':
        event.preventDefault();
        document.getElementById('search-input').focus();
        break;
      case ' ': {
        const [first] = Array.from(state.selectedIds);
        if (first) {
          event.preventDefault();
          store.toggleCompleted(first);
          render();
        }
        break;
      }
      case 'p': {
        const [first] = Array.from(state.selectedIds);
        if (!first) break;
        const task = store.tasks.find(t => t.id === first);
        if (!task) break;
        store.setPriority(first, cyclePriority(task.priority));
        render();
        break;
      }
      case 'e': {
        const [first] = Array.from(state.selectedIds);
        if (!first) break;
        const input = document.querySelector(`.task-item[data-id="${first}"] .task-title`);
        if (input) {
          input.focus();
          input.select();
        }
        break;
      }
      case 'Escape':
        state.selectedIds.clear();
        render();
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5': {
        const index = Number(event.key) - 1;
        const view = state.savedViews[index];
        if (view) {
          state.quickFilter = view.quickFilter;
          state.filterQuery = view.query;
          document.getElementById('search-input').value = state.filterQuery;
          render();
        }
        break;
      }
      default:
        break;
    }
  });
}

function cyclePriority(priority) {
  if (!priority) return 'A';
  if (priority === 'Z') return '';
  const next = String.fromCharCode(priority.charCodeAt(0) + 1);
  return next > 'Z' ? '' : next;
}

function setupThemeToggle() {
  const button = document.getElementById('toggle-theme');
  const app = document.getElementById('app');
  button.addEventListener('click', () => {
    const current = app.dataset.theme;
    if (current === 'auto') {
      app.dataset.theme = 'dark';
      button.setAttribute('aria-pressed', 'true');
    } else if (current === 'dark') {
      app.dataset.theme = 'light';
      button.setAttribute('aria-pressed', 'false');
    } else {
      app.dataset.theme = 'auto';
      button.setAttribute('aria-pressed', 'false');
    }
  });
}

function setupDropImport() {
  const area = document.getElementById('task-list');
  area.addEventListener('dragover', event => {
    const types = Array.from(event.dataTransfer.types || []);
    if (types.includes('Files')) {
      event.preventDefault();
    }
  });
  area.addEventListener('drop', event => {
    const files = event.dataTransfer.files;
    if (!files || !files.length) return;
    event.preventDefault();
    const file = files[0];
    const reader = new FileReader();
    reader.onload = e => {
      const strategy = prompt('Strategie: replace | append | dedupe', 'dedupe');
      store.loadFromText(e.target.result, strategy || 'dedupe');
      render();
    };
    reader.readAsText(file);
  });
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(() => {
      console.warn('Service Worker Registrierung fehlgeschlagen');
    });
  }
}

function bootstrap() {
  initEvents();
  loadState();
  render();
  applyInitialSelection();
}

function applyInitialSelection() {
  const id = new URLSearchParams(window.location.search).get('id');
  if (id) {
    state.selectedIds = new Set([id]);
    render();
  }
}

document.addEventListener('DOMContentLoaded', bootstrap);
