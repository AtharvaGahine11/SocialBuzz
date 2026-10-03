import React from 'react';
import { useDemoStore } from '../../store/demoStore';
import { Building2, Search, MoreVertical, ExternalLink } from 'lucide-react';

const ClientsPage: React.FC = () => {
  const { clients, posts } = useDemoStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 size={24} className="text-primary" /> Client Management
          </h1>
          <p className="text-text-muted text-sm mt-1">Manage 60 agency clients. Displaying seeded demo clients.</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search clients..." 
            className="bg-surface border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-primary w-full sm:w-64"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map(client => {
          const clientPosts = posts.filter(p => p.clientId === client.id);
          const pending = clientPosts.filter(p => p.status === 'Pending Approval').length;

          return (
            <div key={client.id} className="bg-surface border border-white/5 p-5 rounded-xl hover:border-white/20 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 flex items-center justify-center font-bold text-white">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{client.name}</h3>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider">{client.industry}</p>
                  </div>
                </div>
                <button className="text-text-muted hover:text-white"><MoreVertical size={16} /></button>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Contact</span>
                  <span className="text-white font-medium">{client.contactPerson}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Platforms</span>
                  <span className="text-white text-xs">{client.platforms.join(', ')}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex gap-2">
                <div className="flex-1 bg-background rounded-lg p-2 text-center border border-white/5">
                  <p className="text-xs text-text-muted mb-0.5">Total Posts</p>
                  <p className="font-bold text-white">{client.totalPosts + clientPosts.length}</p>
                </div>
                <div className="flex-1 bg-yellow-500/5 rounded-lg p-2 text-center border border-yellow-500/10">
                  <p className="text-xs text-yellow-500/70 mb-0.5">Pending</p>
                  <p className="font-bold text-yellow-400">{pending}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientsPage;
