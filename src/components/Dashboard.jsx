import React, { useState, useEffect, useMemo } from 'react';

export function Dashboard({ tasks, onNavigate }) {
    const today = new Date().toISOString().split('T')[0];

    // Stats calculations
    const stats = useMemo(() => {
        let open = 0;
        let doneTotal = 0;
        let doneToday = 0;
        let dueToday = 0;
        let overdue = 0;
        let inbox = 0;

        tasks.forEach(t => {
            if (t.completed) {
                doneTotal++;
                if (t.completionDate === today) {
                    doneToday++;
                }
            } else {
                open++;
                
                const isInbox = (!t.projects || t.projects.length === 0) && (!t.contexts || t.contexts.length === 0);
                if (isInbox) inbox++;

                if (t.metadata && t.metadata.due) {
                    if (t.metadata.due === today) dueToday++;
                    else if (t.metadata.due < today) overdue++;
                }
            }
        });

        // Calculate progress percentage for today
        const totalForToday = doneToday + dueToday;
        const progressPercent = totalForToday === 0 ? 0 : Math.round((doneToday / totalForToday) * 100);

        return { open, doneTotal, doneToday, dueToday, overdue, inbox, totalForToday, progressPercent };
    }, [tasks, today]);

    // Pomodoro Timer State
    const POMODORO_MINUTES = 25;
    const BREAK_MINUTES = 5;
    const [timeLeft, setTimeLeft] = useState(POMODORO_MINUTES * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [timerMode, setTimerMode] = useState('focus'); // 'focus' | 'break'

    useEffect(() => {
        let interval = null;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            // Auto-switch mode on complete? (Optional, skipping for simplicity)
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    const toggleTimer = () => setIsRunning(!isRunning);
    
    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(timerMode === 'focus' ? POMODORO_MINUTES * 60 : BREAK_MINUTES * 60);
    };

    const switchMode = (mode) => {
        setTimerMode(mode);
        setIsRunning(false);
        setTimeLeft(mode === 'focus' ? POMODORO_MINUTES * 60 : BREAK_MINUTES * 60);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className="w-full text-zinc-300 space-y-8 animate-in fade-in duration-500 pb-20 px-4 mt-6 max-w-4xl mx-auto">
            
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Dashboard</h2>
                <p className="text-zinc-500 text-sm mt-1">Get a quick overview of your tasks and stay focused.</p>
            </div>

            {/* Daily Progress */}
            <section className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">Today's Progress</h3>
                        <p className="text-sm text-zinc-500">{stats.doneToday} of {stats.totalForToday} tasks completed</p>
                    </div>
                    <span className="text-2xl font-bold text-blue-400">{stats.progressPercent}%</span>
                </div>
                
                {/* CSS Progress Bar */}
                <div className="w-full bg-zinc-950 rounded-full h-4 overflow-hidden border border-zinc-800/50">
                    <div 
                        className="bg-blue-500 h-4 rounded-full transition-all duration-1000 ease-out relative"
                        style={{ width: `${stats.progressPercent}%` }}
                    >
                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20" style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)'}}></div>
                    </div>
                </div>
            </section>

            {/* Stat Cards */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div 
                    onClick={() => onNavigate('inbox')}
                    className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-5 hover:bg-zinc-900 transition-colors cursor-pointer flex flex-col items-center justify-center text-center"
                >
                    <span className="text-3xl font-bold text-white mb-1">{stats.inbox}</span>
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Inbox</span>
                </div>

                <div 
                    onClick={() => onNavigate('today')}
                    className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-5 hover:bg-zinc-900 transition-colors cursor-pointer flex flex-col items-center justify-center text-center ring-1 ring-yellow-500/20"
                >
                    <span className="text-3xl font-bold text-yellow-500 mb-1">{stats.dueToday}</span>
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Due Today</span>
                </div>

                <div 
                    onClick={() => onNavigate('overdue')}
                    className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-5 hover:bg-zinc-900 transition-colors cursor-pointer flex flex-col items-center justify-center text-center ring-1 ring-red-500/20"
                >
                    <span className="text-3xl font-bold text-red-500 mb-1">{stats.overdue}</span>
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Overdue</span>
                </div>

                <div 
                    onClick={() => onNavigate('all')}
                    className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-5 hover:bg-zinc-900 transition-colors cursor-pointer flex flex-col items-center justify-center text-center"
                >
                    <span className="text-3xl font-bold text-emerald-500 mb-1">{stats.doneTotal}</span>
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Done</span>
                </div>
            </section>

            {/* Pomodoro Timer */}
            <section className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-8 text-center flex flex-col items-center">
                <h3 className="text-xl font-bold text-white mb-6">Focus Timer</h3>
                
                <div className="flex gap-2 bg-zinc-950 p-1 rounded-lg mb-8 border border-zinc-800/50">
                    <button 
                        onClick={() => switchMode('focus')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${timerMode === 'focus' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Focus (25m)
                    </button>
                    <button 
                        onClick={() => switchMode('break')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${timerMode === 'break' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Break (5m)
                    </button>
                </div>

                <div className="text-7xl md:text-8xl font-black font-mono tracking-tighter text-white mb-8">
                    {formatTime(timeLeft)}
                </div>

                <div className="flex gap-4">
                    <button 
                        onClick={toggleTimer}
                        className={`px-8 py-3 rounded-xl font-bold text-lg transition-colors ${isRunning ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
                    >
                        {isRunning ? 'Pause' : 'Start'}
                    </button>
                    <button 
                        onClick={resetTimer}
                        className="px-6 py-3 rounded-xl font-medium text-zinc-400 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800/50 transition-colors"
                    >
                        Reset
                    </button>
                </div>
            </section>

        </div>
    );
}
