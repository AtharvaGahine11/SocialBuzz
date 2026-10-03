import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from 'recharts';
import { 
  FileText, Clock, Send, AlertCircle, ArrowUpRight, Plus, 
  Calendar, CheckCircle2 
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { useNavigate } from 'react-router-dom';
import { format, parseISO, isAfter, isBefore, addDays, subDays } from 'date-fns';

const OverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { posts, clients, currentUserRole } = useDemoStore();
  
  // Calculate KPI metrics
  const totalPosts = posts.length;
  const pendingApprovals = posts.filter(p => p.status === 'Pending Approval').length;
  const scheduledPosts = posts.filter(p => p.status === 'Scheduled').length;
  const publishedPosts = posts.filter(p => p.status === 'Published').length;
  const failedPosts = posts.filter(p => p.status === 'Failed').length;

  // Chart data (dummy based on dates)
  const activityData = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dateStr = format(date, 'MMM dd');
    return {
      name: dateStr,
      created: posts.filter(p => format(parseISO(p.createdAt), 'MMM dd') === dateStr).length,
      published: posts.filter(p => p.publishedAt && format(parseISO(p.publishedAt), 'MMM dd') === dateStr).length,
    };
  });

  const kpis = [
    { label: 'Total Posts', value: totalPosts, icon: <FileText size={20} className="text-white" />, color: 'bg-primary/20 border-primary' },
    { label: 'Pending Approval', value: pendingApprovals, icon: <Clock size={20} className="text-yellow-400" />, color: 'bg-yellow-500/10 border-yellow-500/30' },
    { label: 'Scheduled', value: scheduledPosts, icon: <Calendar size={20} className="text-accent" />, color: 'bg-accent/10 border-accent/30' },
    { label: 'Published', value: publishedPosts, icon: <Send size={20} className="text-green-400" />, color: 'bg-green-500/10 border-green-500/30' },
    { label: 'Failed', value: failedPosts, icon: <AlertCircle size={20} className="text-red-400" />, color: 'bg-red-500/10 border-red-500/30' },
  ];

  const recentPending = posts.filter(p => p.status === 'Pending Approval').slice(0, 3);
  const upcomingPosts = posts.filter(p => p.status === 'Scheduled').slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-text-muted text-sm mt-1">
            Welcome back. {pendingApprovals > 0 ? `You have ${pendingApprovals} posts awaiting approval.` : 'Your workspace is clear.'}
          </p>
        </div>
        <button 
          onClick={() => navigate('/app/create')}
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Create Post
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div 
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-surface border border-white/5 p-4 rounded-xl flex flex-col"
          >
            <div className="flex items-start justify-between mb-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${kpi.color}`}>
                {kpi.icon}
              </div>
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-bold text-white">{kpi.value}</h3>
              <p className="text-xs text-text-muted uppercase tracking-wider mt-1">{kpi.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-surface border border-white/5 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-white">Content Activity (Last 7 Days)</h3>
            <select className="bg-background border border-white/10 rounded-md text-xs px-2 py-1 text-text-muted outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111A2E', borderColor: '#ffffff10', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" name="Created" dataKey="created" stroke="#547BFF" strokeWidth={3} dot={{ r: 4, fill: '#547BFF', strokeWidth: 0 }} />
                <Line type="monotone" name="Published" dataKey="published" stroke="#60DDF4" strokeWidth={3} dot={{ r: 4, fill: '#60DDF4', strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pending Actions */}
        <div className="space-y-6">
          <div className="bg-surface border border-white/5 p-6 rounded-xl flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-white">Action Required</h3>
              <button onClick={() => navigate('/app/approvals')} className="text-xs text-primary hover:text-primary-hover flex items-center gap-1">
                View all <ArrowUpRight size={14} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col gap-3">
              {recentPending.length > 0 ? (
                recentPending.map(post => {
                  const client = clients.find(c => c.id === post.clientId);
                  return (
                    <div key={post.id} className="p-3 rounded-lg border border-white/5 bg-background/50 hover:bg-white/5 cursor-pointer transition-colors" onClick={() => navigate('/app/approvals')}>
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-medium text-white line-clamp-1">{post.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400 whitespace-nowrap">Pending</span>
                      </div>
                      <p className="text-[10px] text-text-muted">{client?.name} • {post.platform}</p>
                    </div>
                  )
                })
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-4 opacity-50">
                  <CheckCircle2 size={32} className="text-green-400 mb-2" />
                  <p className="text-sm text-white">All caught up!</p>
                  <p className="text-xs text-text-muted">No posts awaiting approval.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
