import React from 'react';
import { useDemoStore } from '../../store/demoStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Download, TrendingUp } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const { posts } = useDemoStore();

  const total = posts.length;
  const published = posts.filter(p => p.status === 'Published').length;
  const failed = posts.filter(p => p.status === 'Failed').length;
  const successRate = total > 0 ? Math.round((published / (published + failed)) * 100) || 0 : 0;

  const platformData = [
    { name: 'Instagram', value: posts.filter(p => p.platform === 'Instagram').length, color: '#E1306C' },
    { name: 'Facebook', value: posts.filter(p => p.platform === 'Facebook').length, color: '#1877F2' },
    { name: 'X', value: posts.filter(p => p.platform === 'X').length, color: '#1DA1F2' },
    { name: 'LinkedIn', value: posts.filter(p => p.platform === 'LinkedIn').length, color: '#0A66C2' }
  ].filter(d => d.value > 0);

  const statusData = [
    { name: 'Published', value: published, color: '#22c55e' },
    { name: 'Failed', value: failed, color: '#ef4444' },
    { name: 'Pending', value: posts.filter(p => p.status === 'Pending Approval').length, color: '#eab308' },
    { name: 'Scheduled', value: posts.filter(p => p.status === 'Scheduled').length, color: '#60DDF4' }
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-text-muted text-sm mt-1">Prototype reporting based on local demo data.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-white/10 rounded-lg text-white hover:bg-white/5 transition-colors text-sm font-medium">
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-surface border border-white/5 p-4 rounded-xl">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Total Posts</p>
          <h3 className="text-2xl font-bold text-white">{total}</h3>
        </div>
        <div className="bg-surface border border-white/5 p-4 rounded-xl">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Published</p>
          <h3 className="text-2xl font-bold text-green-400">{published}</h3>
        </div>
        <div className="bg-surface border border-white/5 p-4 rounded-xl">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Success Rate</p>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            {successRate}% {successRate > 90 && <TrendingUp size={16} className="text-green-400" />}
          </h3>
        </div>
        <div className="bg-surface border border-white/5 p-4 rounded-xl">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Avg Approval Time</p>
          <h3 className="text-2xl font-bold text-white">4.2 <span className="text-sm font-normal text-text-muted">hrs</span></h3>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-surface border border-white/5 p-6 rounded-xl">
          <h3 className="font-semibold text-white mb-6">Posts by Platform</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={platformData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {platformData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: '#111A2E', borderColor: '#ffffff10', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface border border-white/5 p-6 rounded-xl">
          <h3 className="font-semibold text-white mb-6">Pipeline Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#111A2E', borderColor: '#ffffff10', borderRadius: '8px' }} cursor={{ fill: '#ffffff05' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
