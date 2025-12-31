import React, { useState } from 'react';

export function CalendarPopup({ onSelect, onClose }) {
    const [viewDate, setViewDate] = useState(new Date());

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => {
        const day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1; // Adjust to Monday start (0=Mon, 6=Sun)
    };

    const handlePrevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const handleDayClick = (day) => {
        const year = viewDate.getFullYear();
        const month = String(viewDate.getMonth() + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        onSelect(`${year}-${month}-${d}`);
    };

    const year = viewDate.getFullYear();
    const monthIndex = viewDate.getMonth();
    const monthName = viewDate.toLocaleString('default', { month: 'long' });
    const daysInMonth = getDaysInMonth(year, monthIndex);
    const startDay = getFirstDayOfMonth(year, monthIndex);

    const days = [];
    for (let i = 0; i < startDay; i++) days.push(<div key={`empty-${i}`} />);
    for (let i = 1; i <= daysInMonth; i++) {
        const isToday =
            i === new Date().getDate() &&
            monthIndex === new Date().getMonth() &&
            year === new Date().getFullYear();

        days.push(
            <button
                key={i}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDayClick(i); }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm hover:bg-zinc-700 transition-colors ${isToday ? 'bg-blue-600 text-white hover:bg-blue-500' : 'text-zinc-300'}`}
            >
                {i}
            </button>
        );
    }

    return (
        <div className="fixed top-32 right-4 bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-4 w-72 z-[60] animate-in fade-in slide-in-from-top-4 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <button onClick={(e) => { e.preventDefault(); handlePrevMonth(); }} className="p-1 hover:text-white text-zinc-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="font-semibold text-zinc-200">{monthName} {year}</div>
                <div className="flex items-center gap-1">
                    <button onClick={(e) => { e.preventDefault(); handleNextMonth(); }} className="p-1 hover:text-white text-zinc-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                    {/* Close Button */}
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClose && onClose(); }}
                        className="p-1 hover:text-red-400 text-zinc-500 ml-1"
                        title="Close"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 mb-2 text-center">
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
                    <div key={d} className="text-xs text-zinc-500 font-medium">{d}</div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 place-items-center">
                {days}
            </div>
        </div>
    );
}
