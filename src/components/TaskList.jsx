import React, { useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { TaskItem } from './TaskItem';


export function TaskList({ tasks, activeFilter, selectedTaskIds, onTaskSelect, onSelectAll, focusedTaskId, onTaskFocus, editingTaskId, onEditEnd, onFilterClick, projects, contexts, tags, onOpenCalendar, onEdit, onDragEnd }) {
    const allVisibleSelected = tasks.length > 0 && tasks.every(t => selectedTaskIds?.has(t.id));
    const someSelected = tasks.some(t => selectedTaskIds?.has(t.id));
    const isIndeterminate = someSelected && !allVisibleSelected;

    const checkboxRef = useRef(null);

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = isIndeterminate;
        }
    }, [isIndeterminate]);


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="pb-20">

                <div className="mb-1">
                    {/* Select All Header */}
                    {tasks.length > 0 && (
                        <div className="flex items-center py-2 -mx-4 px-4 border-b border-zinc-800/50 mb-1 group">
                            <div className="mr-3 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                                <input
                                    ref={checkboxRef}
                                    type="checkbox"
                                    checked={allVisibleSelected}
                                    onChange={onSelectAll}
                                    className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    title="Select All Visible"
                                />
                            </div>
                            <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider select-none cursor-pointer" onClick={onSelectAll}>
                                {allVisibleSelected ? 'Select None' : isIndeterminate ? 'Select all' : 'Select All'}
                            </div>
                        </div>
                    )}

                    <Droppable droppableId="task-list">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {tasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className={`${snapshot.isDragging ? 'shadow-lg shadow-black/50 ring-1 ring-blue-500/50 z-50 bg-zinc-900' : ''}`}
                                            >
                                                <TaskItem
                                                    task={task}
                                                    dragHandleProps={provided.dragHandleProps}
                                                    isDragging={snapshot.isDragging}
                                                    selectionCount={selectedTaskIds?.size || 0}
                                                    selected={selectedTaskIds?.has(task.id)}
                                                    onSelect={(e) => onTaskSelect && onTaskSelect(task.id, e)}
                                                    selectionMode={selectedTaskIds && selectedTaskIds.size > 0}
                                                    isFocused={focusedTaskId === task.id}
                                                    onTaskFocus={onTaskFocus}
                                                    isEditingProp={editingTaskId === task.id}
                                                    onEditEnd={onEditEnd}
                                                    onEdit={onEdit}
                                                    onFilterClick={onFilterClick}
                                                    projects={projects}
                                                    contexts={contexts}
                                                    tags={tags}
                                                    onOpenCalendar={onOpenCalendar}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>


                {tasks.length === 0 && (
                    <div className="py-8 w-full">

                        <div className="space-y-12 w-full">

                            <div className="flex flex-col items-center justify-center text-center space-y-4 pt-12">
                                <div className="w-16 h-16 rounded-full bg-zinc-900/50 flex items-center justify-center border border-zinc-800/50">
                                    <span className="text-2xl opacity-50">✨</span>
                                </div>
                                <div>
                                    <h3 className="text-zinc-400 font-medium">No tasks found</h3>
                                    <p className="text-zinc-600 text-sm mt-1">Press <kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-400 font-mono text-[10px]">N</kbd> or <kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-400 font-mono text-[10px]">/</kbd> to create a new task.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DragDropContext>
    );
}
