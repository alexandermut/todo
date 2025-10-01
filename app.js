/* Minimal todo.txt Web – Import/Parse/Render/Toggle/Export/LocalStorage
   Fokus: <150–180 Zeilen, kein Framework. */
const qs = (s, el=document) => el.querySelector(s);
const qsa = (s, el=document) => [...el.querySelectorAll(s)];

const els = {
  file: qs('#fileInput'),
  importBtn: qs('#importBtn'),
  exportBtn: qs('#exportBtn'),
  list: qs('#list'),
  newInput: qs('#newInput'),
  addBtn: qs('#addBtn'),
  showDone: qs('#showDone'),
  cOpen: qs('#countOpen'),
  cDone: qs('#countDone'),
};

let tasks = [];
const LS_KEY = 'todo_txt_minimal_v1';

function todayISO() {
  const d = new Date();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function uid() { return 't' + Math.random().toString(36).slice(2) + Date.now().toString(36); }

// --- Parser / Serializer (subset, robust genug) ---
function parseLine(line) {
  const raw = line.trim();
  if (!raw) return null;
  let s = raw, done = false, doneDate = null, created = null, priority = null;

  // completed: x YYYY-MM-DD [CREATED]
  let m = s.match(/^x\s+(\d{4}-\d{2}-\d{2})(?:\s+(\d{4}-\d{2}-\d{2}))?\s+/);
  if (m) { done = true; doneDate = m[1]; if (m[2]) created = m[2]; s = s.slice(m[0].length); }

  // priority: (A)
  m = s.match(/^\(([A-Z])\)\s+/);
  if (m) { priority = m[1]; s = s.slice(m[0].length); }

  // created date if not set
  m = s.match(/^(\d{4}-\d{2}-\d{2})\s+/);
  if (m && !created) { created = m[1]; s = s.slice(m[0].length); }

  const tokens = s.split(/\s+/);
  const projects = [], contexts = [], meta = {};
  const textParts = [];
  for (const t of tokens) {
    if (t.startsWith('+') && t.length>1) projects.push(t.slice(1));
    else if (t.startsWith('@') && t.length>1) contexts.push(t.slice(1));
    else if (t.includes(':')) {
      const [k,...rest] = t.split(':');
      const v = rest.join(':');
      if (k && v) meta[k] = v;
      else textParts.push(t);
    } else textParts.push(t);
  }
  const text = textParts.join(' ').trim();
  let id = meta.id || uid();
  meta.id = id;

  return { id, raw, done, doneDate, created, priority, text, projects, contexts, meta };
}

function serializeTask(t) {
  const parts = [];
  if (t.done) {
    parts.push('x', t.doneDate || todayISO());
    if (t.created) parts.push(t.created);
  } else if (t.priority) {
    parts.push(`(${t.priority})`);
  }
  if (!t.done && t.created) parts.push(t.created);
  if (t.text) parts.push(t.text);
  t.projects?.forEach(p => parts.push('+'+p));
  t.contexts?.forEach(c => parts.push('@'+c));
  // stable meta order: id first
  const entries = Object.entries(t.meta || {});
  entries.sort(([a],[b]) => (a==='id'?'-id':a).localeCompare(b==='id'?'-id':b));
  for (const [k,v] of entries) parts.push(`${k}:${v}`);
  return parts.join(' ').trim();
}

// --- Persistence ---
function saveLS() {
  const lines = tasks.map(serializeTask);
  localStorage.setItem(LS_KEY, JSON.stringify(lines));
}
function loadLS() {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return false;
  try {
    const lines = JSON.parse(raw);
    tasks = lines.map(l => parseLine(l)).filter(Boolean);
    return true;
  } catch { return false; }
}

// --- UI Render ---
function render() {
  const showDone = els.showDone.checked;
  els.list.innerHTML = '';
  let open = 0, done = 0;

  for (const t of tasks) {
    if (!showDone && t.done) { done++; continue; }
    if (t.done) done++; else open++;

    const li = document.createElement('li');
    li.className = 'item' + (t.done ? ' done' : '');
    li.tabIndex = 0;
    li.dataset.id = t.id;

    const cb = document.createElement('input');
    cb.type = 'checkbox'; cb.checked = t.done; cb.ariaLabel = 'Erledigt umschalten';

    const title = document.createElement('div');
    title.className = 'title';

    if (t.priority) {
      const pr = document.createElement('span');
      pr.className = 'prio ' + (t.priority==='A'?'A':'');
      pr.textContent = `(${t.priority})`;
      title.appendChild(pr);
    }

    const span = document.createElement('span');
    span.className = 'text'; span.contentEditable = 'true';
    span.spellcheck = false; span.textContent = t.text || '(ohne Titel)';
    span.addEventListener('blur', () => { t.text = span.textContent.trim(); saveLS(); render(); });

    const meta = document.createElement('div');
    meta.className = 'meta';
    if (t.projects?.length) t.projects.forEach(p => {
      const chip = document.createElement('span'); chip.className='chip'; chip.textContent='+'+p; meta.appendChild(chip);
    });
    if (t.contexts?.length) t.contexts.forEach(c => {
      const chip = document.createElement('span'); chip.className='chip'; chip.textContent='@'+c; meta.appendChild(chip);
    });
    if (t.meta?.due) {
      const due = document.createElement('span'); due.className='chip badge-due'; due.textContent='due:'+t.meta.due; meta.appendChild(due);
    }

    title.appendChild(span);
    title.appendChild(meta);

    const right = document.createElement('div');
    const k = document.createElement('kbd');
    k.textContent = t.created ? t.created : (t.done ? t.doneDate : '');
    right.appendChild(k);

    li.appendChild(cb);
    li.appendChild(title);
    li.appendChild(right);

    // interactions
    cb.addEventListener('change', () => toggleDone(t.id));
    li.addEventListener('keydown', (e) => {
      if (e.code === 'Space') { e.preventDefault(); toggleDone(t.id); }
    });

    els.list.appendChild(li);
  }

  els.cOpen.textContent = open;
  els.cDone.textContent = done;
}

function toggleDone(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  if (t.done) {
    t.done = false; t.doneDate = null;
  } else {
    t.done = true; t.doneDate = todayISO();
  }
  saveLS(); render();
}

// --- Import / Export / Add ---
function importFromText(text) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const parsed = lines.map(parseLine).filter(Boolean);
  if (parsed.length) {
    tasks = parsed;
    saveLS(); render();
  }
}

function exportToFile() {
  const data = tasks.map(serializeTask).join('\n') + '\n';
  const blob = new Blob([data], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'todo.txt';
  document.body.appendChild(a); a.click();
  a.remove(); URL.revokeObjectURL(url);
}

function addFromInput() {
  const line = els.newInput.value.trim();
  if (!line) return;
  const t = parseLine(line);
  if (!t) return;
  tasks.unshift(t);
  els.newInput.value = '';
  saveLS(); render();
}

// --- Wire UI ---
els.importBtn.addEventListener('click', () => els.file.click());
els.file.addEventListener('change', async () => {
  const f = els.file.files[0];
  if (!f) return;
  const txt = await f.text();
  importFromText(txt);
  els.file.value = '';
});
els.exportBtn.addEventListener('click', exportToFile);
els.addBtn.addEventListener('click', addFromInput);
els.newInput.addEventListener('keydown', e => { if (e.key === 'Enter') addFromInput(); });
els.showDone.addEventListener('change', render);

// --- Boot ---
(function boot(){
  if (!loadLS()) {
    // Demo-Daten beim ersten Start
    importFromText([
      '(A) Angebot finalisieren +Arbeit @Office due:2025-10-03 id:seed1',
      'x 2025-09-28 2025-09-20 Steuer erledigt +Privat @Home id:seed2',
      'Einkaufen +Haushalt @City t:2025-10-02 id:seed3',
      '(B) Laufen gehen @Fitness due:2025-10-01 id:seed4'
    ].join('\n'));
  } else {
    render();
  }
})();
