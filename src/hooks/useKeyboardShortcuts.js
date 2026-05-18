
import { useEffect, useState, useRef, useLayoutEffect } from 'react';

export const useKeyboardShortcuts = ({
    tasks,
    focusedTaskId,
    setFocusedTaskId,
    setSearchFocus,
    onTaskComplete,
    onTaskDelete,
    onTaskEdit,
    onTaskPriority,
    onUndo,
    onRedo,
    clearFilters,
    onClearSelection,
    selectedTaskIds,
    onSelectTask,
    onTasksDelete,
    onMoveTask,
}) => {
    const [priorityMode, setPriorityMode] = useState(false);
    const lastDeleteRef = useRef(0);

    // Use refs to hold latest values for use inside event listener
    const latestProps = useRef({ tasks, focusedTaskId, selectedTaskIds, onUndo, onRedo, onTaskPriority, onTaskComplete, onTaskDelete, onTasksDelete, onTaskEdit, onClearSelection, setSearchFocus, clearFilters, onSelectTask, onMoveTask });

    // useLayoutEffect ensures the ref is updated synchronously after render/DOM mutation,
    // preventing any "stale" state window between the visual update and the event listener's execution.
    useLayoutEffect(() => {
        latestProps.current = { tasks, focusedTaskId, selectedTaskIds, onUndo, onRedo, onTaskPriority, onTaskComplete, onTaskDelete, onTasksDelete, onTaskEdit, onClearSelection, setSearchFocus, clearFilters, onSelectTask, onMoveTask };
    }, [tasks, focusedTaskId, selectedTaskIds, onUndo, onRedo, onTaskPriority, onTaskComplete, onTaskDelete, onTasksDelete, onTaskEdit, onClearSelection, setSearchFocus, clearFilters, onSelectTask, onMoveTask]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const {
                tasks, focusedTaskId, selectedTaskIds,
                onUndo, onRedo, onTaskPriority, onTaskComplete, onTaskDelete, onTasksDelete,
                onTaskEdit, onClearSelection, setSearchFocus, clearFilters, onSelectTask, onMoveTask
            } = latestProps.current;

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
                if (onClearSelection) onClearSelection(); // Clear selection on Esc
                setFocusedTaskId(null); // Clear focus
                return;
            }

            // 'N' Shortcut to Focus Search/Input
            if (e.key.toLowerCase() === 'n' && !priorityMode) {
                e.preventDefault();
                setSearchFocus();
                return;
            }

            // Undo (Ctrl+Z or Cmd+Z) and Redo (Cmd+Shift+Z)
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
                console.log(`Shortcut Triggered: ${e.shiftKey ? 'Redo' : 'Undo'}`);
                e.preventDefault();
                if (e.shiftKey) {
                    if (onRedo) {
                        console.log("Calling onRedo callback");
                        onRedo();
                    } else {
                        console.log("onRedo callback is missing");
                    }
                } else {
                    if (onUndo) onUndo();
                }
                return;
            }

            // If no tasks, navigation doesn't make sense
            if (!tasks || tasks.length === 0) return;

            const currentIndex = tasks.findIndex(t => String(t.id) === String(focusedTaskId));

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
                    setPriorityMode(false);
                }
                return;
            }

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    // Option + ArrowDown = move task down
                    if (e.altKey && focusedTaskId && onMoveTask) {
                        onMoveTask(focusedTaskId, 'down');
                        break;
                    }
                    let nextIdDown = null;
                    if (currentIndex < tasks.length - 1) {
                        nextIdDown = tasks[currentIndex + 1].id;
                    } else if (currentIndex === -1) {
                        nextIdDown = tasks[0].id;
                    }

                    if (nextIdDown) {
                        setFocusedTaskId(nextIdDown);
                        if (e.shiftKey && onSelectTask) {
                            if (focusedTaskId) onSelectTask(focusedTaskId, true);
                            onSelectTask(nextIdDown, true);
                        }
                    }
                    break;

                case 'ArrowUp':
                    e.preventDefault();
                    // Option + ArrowUp = move task up
                    if (e.altKey && focusedTaskId && onMoveTask) {
                        onMoveTask(focusedTaskId, 'up');
                        break;
                    }
                    let nextIdUp = null;
                    if (currentIndex > 0) {
                        nextIdUp = tasks[currentIndex - 1].id;
                    } else if (currentIndex === -1) {
                        nextIdUp = tasks[tasks.length - 1].id;
                    }

                    if (nextIdUp) {
                        setFocusedTaskId(nextIdUp);
                        if (e.shiftKey && onSelectTask) {
                            if (focusedTaskId) onSelectTask(focusedTaskId, true);
                            onSelectTask(nextIdUp, true);
                        }
                    }
                    break;

                case 'x':
                case ' ': // Space alias
                    if (focusedTaskId && onTaskComplete) {
                        e.preventDefault();
                        onTaskComplete(focusedTaskId);
                    }
                    break;

                case 'a':
                    // Toggle selection on focused task
                    if (focusedTaskId && onSelectTask) {
                        e.preventDefault();
                        const selected = selectedTaskIds && selectedTaskIds.has(focusedTaskId);
                        onSelectTask(focusedTaskId, !selected);
                    }
                    break;

                case 'd':
                    // Delete focused task, double-press = undo
                    if (focusedTaskId) {
                        e.preventDefault();
                        const now = Date.now();
                        if (now - lastDeleteRef.current < 800 && onUndo) {
                            onUndo();
                            lastDeleteRef.current = 0;
                        } else if (onTaskDelete) {
                            onTaskDelete(focusedTaskId);
                            lastDeleteRef.current = now;
                        }
                    }
                    break;

                case 'Delete':
                case 'Backspace':
                    // Bulk Delete (Shift + Delete)
                    if (e.shiftKey && selectedTaskIds && selectedTaskIds.size > 0 && onTasksDelete) {
                        e.preventDefault();
                        onTasksDelete(Array.from(selectedTaskIds));
                    }
                    // Single Delete (Focused Task)
                    else if (focusedTaskId && onTaskDelete) {
                        e.preventDefault(); // Prevent navigating back
                        onTaskDelete(focusedTaskId);
                    }
                    break;

                case 'ArrowRight':
                    if (focusedTaskId) {
                        e.preventDefault();
                        if (e.shiftKey && onSelectTask) {
                            onSelectTask(focusedTaskId, true); // Select
                        } else {
                            onTaskPriority(focusedTaskId, 'up');
                        }
                    }
                    break;

                case 'ArrowLeft':
                    if (focusedTaskId) {
                        e.preventDefault();
                        if (e.shiftKey && onSelectTask) {
                            onSelectTask(focusedTaskId, false); // Deselect
                        } else {
                            onTaskPriority(focusedTaskId, 'down');
                        }
                    }
                    break;

                case 'Enter':
                    if (focusedTaskId && onTaskEdit) {
                        e.preventDefault();
                        onTaskEdit(focusedTaskId);
                    } else if (focusedTaskId && !onTaskEdit) {
                        // If no edit handler (should usually be there), maybe just ignore or basic toggle?
                        // For now, doing nothing effectively.
                    }
                    break;

                case '!':
                    e.preventDefault();
                    setPriorityMode(true);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setFocusedTaskId, setSearchFocus, onTaskComplete, onTaskDelete, onTaskEdit, onTaskPriority, onUndo, clearFilters, onClearSelection, onSelectTask, priorityMode, tasks, focusedTaskId, selectedTaskIds]);

    return { priorityMode };
};
