import React from 'react';
import { useDemoStore } from '../../store/demoStore';
import { format, parseISO } from 'date-fns';
import { Bell, CheckCircle2, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useDemoStore();
  const navigate = useNavigate();

  const getIcon = (type: string) => {
    switch(type) {
      case 'success': return <CheckCircle2 size={20} className="text-green-400" />;
      case 'warning': return <AlertTriangle size={20} className="text-yellow-400" />;
      case 'error': return <AlertCircle size={20} className="text-red-400" />;
      default: return <Info size={20} className="text-primary" />;
    }
  };

  const handleNotificationClick = (n: any) => {
    if (!n.read) markNotificationRead(n.id);
    if (n.relatedPostId) {
      navigate('/app/approvals');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <p className="text-text-muted text-sm mt-1">Updates on your posts and approvals.</p>
        </div>
        <button 
          onClick={markAllNotificationsRead}
          className="text-sm font-medium text-primary hover:text-primary-hover"
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-surface border border-white/5 rounded-xl flex flex-col overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-text-muted">
            <Bell size={48} className="mx-auto mb-4 opacity-20" />
            <p>You have no notifications.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {notifications.map(n => (
              <div 
                key={n.id} 
                onClick={() => handleNotificationClick(n)}
                className={`p-4 flex gap-4 cursor-pointer transition-colors hover:bg-white/5 ${!n.read ? 'bg-primary/5' : ''}`}
              >
                <div className="mt-1 shrink-0">{getIcon(n.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={`text-sm font-semibold ${!n.read ? 'text-white' : 'text-text-muted'}`}>{n.title}</h4>
                    <span className="text-xs text-text-muted/70">{format(parseISO(n.createdAt), 'MMM dd, HH:mm')}</span>
                  </div>
                  <p className="text-sm text-text-muted mt-1">{n.message}</p>
                </div>
                {!n.read && <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
