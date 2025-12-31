
import { useEffect, useState } from 'react';

export const useKeyboardShortcuts = ({
    tasks,
    focusedTaskId,
    setFocusedTaskId,
    setSearchFocus,
    onTaskComplete,
    onTaskDelete,
    onTaskEdit, // Enters edit mode for the task
    onTaskPriority, // Callback to update priority
    onUndo, // Callback for undo
    clearFilters
}) => {
    const [priorityMode, setPriorityMode] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Ignore if focus is in an input or textarea (unless it's Esc to blur)
            const isInput = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);

            if (isInput) {
                if (e.key === 'Escape') {
                    document.activeElement.blur();
                    e.preventDefault();
                }
                return;
            }

            // Global Shortcuts
            if (e.key === '/') {
                e.preventDefault();
                setSearchFocus();
                return;
            }

            if (e.key === 'Escape') {
                e.preventDefault();
                if (priorityMode) {
                    setPriorityMode(false);
                    return;
                }
                if (clearFilters) clearFilters();
                setFocusedTaskId(null); // Clear focus
                return;
            }

            // Undo (Ctrl+Z or Cmd+Z)
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault();
                if (onUndo) onUndo();
                return;
            }

            // If no tasks, navigation doesn't make sense
            if (!tasks || tasks.length === 0) return;

            const currentIndex = tasks.findIndex(t => t.id === focusedTaskId);

            // Priority Mode Handling
            if (priorityMode) {
                if (['a', 'b', 'c', 'n'].includes(e.key.toLowerCase())) {
                    e.preventDefault();
                    if (focusedTaskId) {
                        const prio = e.key.toLowerCase() === 'n' ? null : e.key.toUpperCase();
                        onTaskPriority(focusedTaskId, prio);
                    }
                    setPriorityMode(false);
                } else {
                    // Any other key keeps us out of priority mode? Or just ignore?
                    // Let's exit priority mode on invalid key to avoid getting stuck
                    setPriorityMode(false);
                    // Re-process this key? Maybe complicated. Just consume and exit.
                }
                return;
            }

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    if (currentIndex < tasks.length - 1) {
                        setFocusedTaskId(tasks[currentIndex + 1].id);
                    } else if (currentIndex === -1) {
                        setFocusedTaskId(tasks[0].id);
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (currentIndex > 0) {
                        setFocusedTaskId(tasks[currentIndex - 1].id);
                    } else if (currentIndex === -1 && tasks.length > 0) {
                        setFocusedTaskId(tasks[tasks.length - 1].id);
                    }
                    break;
                case ' ': // Toggle completion (Space)
                case 'x': // Toggle completion (x)
                    if (focusedTaskId) {
                        e.preventDefault();
                        onTaskComplete(focusedTaskId);
                    }
                    break;
                case 'e': // Edit
                    if (focusedTaskId) {
                        e.preventDefault();
                        onTaskEdit(focusedTaskId);
                    }
                    break;
                case 'Delete':
                case 'Backspace':
                    if (focusedTaskId) {
                        e.preventDefault();
                        onTaskDelete(focusedTaskId);
                    }
                    break;
                case 'ArrowRight':
                    if (focusedTaskId) {
                        e.preventDefault();
                        // Still support arrows for cycling
                        onTaskPriority(focusedTaskId, 'up');
                    }
                    break;
                case 'ArrowLeft':
                    if (focusedTaskId) {
                        e.preventDefault();
                        // Still support arrows for cycling
                        onTaskPriority(focusedTaskId, 'down');
                    }
                    break;
                case 'p':
                    if (focusedTaskId) {
                        e.preventDefault();
                        setPriorityMode(true);
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [tasks, focusedTaskId, setFocusedTaskId, setSearchFocus, onTaskComplete, onTaskDelete, onTaskEdit, onTaskPriority, onUndo, clearFilters, priorityMode]);
};
