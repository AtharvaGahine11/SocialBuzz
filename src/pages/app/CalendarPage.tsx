import React, { useState } from 'react';
import { useDemoStore } from '../../store/demoStore';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';

const CalendarPage: React.FC = () => {
  const { posts } = useDemoStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  
  // Calculate days for the calendar grid
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Pad the beginning with empty slots to align weekdays
  const startDayOfWeek = monthStart.getDay(); // 0 is Sunday
  const paddingDays = Array.from({ length: startDayOfWeek }).map((_, i) => i);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const today = () => setCurrentDate(new Date());

  const getDayPosts = (date: Date) => {
    return posts.filter(p => p.scheduledAt && isSameDay(parseISO(p.scheduledAt), date));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-500';
      case 'Scheduled': return 'bg-accent';
      case 'Pending Approval': return 'bg-yellow-500';
      case 'Changes Requested': return 'bg-orange-500';
      case 'Failed': return 'bg-red-500';
      default: return 'bg-white/20';
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col pb-20">
      <div className="flex justify-between items-center shrink-0">
        <h1 className="text-2xl font-bold text-white">Content Calendar</h1>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-sm text-white hover:bg-white/5">
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      <div className="flex-1 bg-surface border border-white/5 rounded-xl flex flex-col overflow-hidden min-h-[600px]">
        {/* Calendar Header */}
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-background/50">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-white min-w-[150px]">{format(currentDate, 'MMMM yyyy')}</h2>
            <div className="flex items-center bg-background rounded-lg border border-white/10">
              <button onClick={prevMonth} className="p-2 hover:bg-white/5 text-text-muted hover:text-white transition-colors rounded-l-lg"><ChevronLeft size={18} /></button>
              <div className="w-px h-4 bg-white/10" />
              <button onClick={today} className="px-3 py-1 text-sm font-medium text-text-muted hover:text-white transition-colors">Today</button>
              <div className="w-px h-4 bg-white/10" />
              <button onClick={nextMonth} className="p-2 hover:bg-white/5 text-text-muted hover:text-white transition-colors rounded-r-lg"><ChevronRight size={18} /></button>
            </div>
          </div>
          <div className="hidden md:flex gap-3 text-[10px] uppercase font-bold text-text-muted">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent"></span> Scheduled</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Pending</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Published</span>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 border-b border-white/5 bg-surface-light">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-2 text-center text-xs font-semibold text-text-muted uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-white/5 gap-px">
          {paddingDays.map(i => (
            <div key={`pad-${i}`} className="bg-surface opacity-50" />
          ))}
          
          {daysInMonth.map((date, i) => {
            const isToday = isSameDay(date, new Date());
            const dayPosts = getDayPosts(date);
            
            return (
              <div key={i} className={`bg-surface p-2 flex flex-col min-h-[100px] hover:bg-white/5 transition-colors group cursor-pointer ${isToday ? 'bg-primary/5' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-primary text-white' : 'text-text-muted group-hover:text-white'}`}>
                    {format(date, 'd')}
                  </span>
                </div>
                
                <div className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
                  {dayPosts.map(post => (
                    <div key={post.id} className="text-left px-1.5 py-1 rounded bg-background border border-white/5 text-[10px] text-white truncate flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${getStatusColor(post.status)}`}></span>
                      <span className="truncate">{post.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
