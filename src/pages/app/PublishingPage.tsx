import React, { useState } from 'react';
import { useDemoStore } from '../../store/demoStore';
import { Play, RotateCcw, Ban, CheckCircle2, AlertCircle, Clock, ShieldAlert } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const PublishingPage: React.FC = () => {
  const { posts, clients, schedulePost, simulatePublishing, cancelPost, currentUserRole } = useDemoStore();
  const [filter, setFilter] = useState<'All' | 'Scheduled' | 'Published' | 'Failed'>('Scheduled');
  
  // Simulation states
  const [isSimulating, setIsSimulating] = useState<string | null>(null);

  const visiblePosts = posts.filter(p => {
    if (filter === 'All') return ['Approved', 'Scheduled', 'Published', 'Failed'].includes(p.status);
    if (filter === 'Scheduled') return p.status === 'Scheduled' || p.status === 'Approved';
    return p.status === filter;
  });

  const handleSimulate = (id: string, success: boolean) => {
    setIsSimulating(id);
    // Fake network delay for effect
    setTimeout(() => {
      simulatePublishing(id, success);
      setIsSimulating(null);
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved': return <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-[10px] font-bold uppercase tracking-wider">Ready</span>;
      case 'Scheduled': return <span className="px-2 py-1 bg-accent/20 text-accent rounded text-[10px] font-bold uppercase tracking-wider">Queued</span>;
      case 'Published': return <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-[10px] font-bold uppercase tracking-wider">Published</span>;
      case 'Failed': return <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-[10px] font-bold uppercase tracking-wider">Failed</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Publishing Queue</h1>
          <p className="text-text-muted text-sm mt-1">Monitor scheduled posts and simulate publishing API responses.</p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex gap-2 border-b border-white/5 pb-4">
        {['Scheduled', 'Published', 'Failed', 'All'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
              ${filter === f ? 'bg-white text-background' : 'bg-surface border border-white/10 text-text-muted hover:text-white'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-surface border border-white/5 rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 bg-background/50 text-xs font-bold text-text-muted uppercase tracking-wider">
          <div className="col-span-4">Post & Client</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3">Schedule / Activity</div>
          <div className="col-span-3 text-right">Actions (Demo)</div>
        </div>
        
        {/* Table Body */}
        <div className="divide-y divide-white/5">
          {visiblePosts.length === 0 ? (
            <div className="p-8 text-center text-text-muted">No posts found in this queue.</div>
          ) : (
            visiblePosts.map(post => {
              const client = clients.find(c => c.id === post.clientId);
              const simulating = isSimulating === post.id;
              
              return (
                <div key={post.id} className={`grid grid-cols-12 gap-4 p-4 items-center transition-colors hover:bg-white/5 ${simulating ? 'opacity-50 pointer-events-none' : ''}`}>
                  <div className="col-span-4">
                    <p className="text-sm font-medium text-white line-clamp-1">{post.title}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">{client?.name} • {post.platform}</p>
                  </div>
                  
                  <div className="col-span-2">
                    {getStatusBadge(post.status)}
                    {post.retryCount > 0 && post.status === 'Failed' && (
                      <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={10}/> Retry {post.retryCount}</p>
                    )}
                  </div>
                  
                  <div className="col-span-3 text-xs text-text-muted">
                    {post.status === 'Published' && post.publishedAt ? (
                      <span className="flex items-center gap-1 text-green-400"><CheckCircle2 size={12}/> {format(parseISO(post.publishedAt), 'MMM dd, HH:mm')}</span>
                    ) : post.status === 'Failed' && post.lastAttemptedAt ? (
                      <span className="flex items-center gap-1 text-red-400"><AlertCircle size={12}/> {format(parseISO(post.lastAttemptedAt), 'MMM dd, HH:mm')}</span>
                    ) : post.scheduledAt ? (
                      <span className="flex items-center gap-1"><Clock size={12}/> {format(parseISO(post.scheduledAt), 'MMM dd, HH:mm')}</span>
                    ) : 'Not scheduled'}
                  </div>
                  
                  <div className="col-span-3 flex justify-end gap-2">
                    {post.status === 'Approved' && (
                      <button onClick={() => schedulePost(post.id)} className="px-3 py-1.5 rounded bg-primary/20 text-primary hover:bg-primary/30 text-xs font-medium transition-colors">
                        Queue Post
                      </button>
                    )}
                    
                    {(post.status === 'Scheduled' || post.status === 'Failed') && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleSimulate(post.id, true)}
                          title="Simulate successful publishing API call"
                          className="w-8 h-8 rounded border border-green-500/30 text-green-400 flex items-center justify-center hover:bg-green-500/10 transition-colors"
                        >
                          {simulating ? <RotateCcw size={14} className="animate-spin" /> : <Play size={14} />}
                        </button>
                        <button 
                          onClick={() => handleSimulate(post.id, false)}
                          title="Simulate publishing failure"
                          className="w-8 h-8 rounded border border-red-500/30 text-red-400 flex items-center justify-center hover:bg-red-500/10 transition-colors"
                        >
                          <Ban size={14} />
                        </button>
                      </div>
                    )}
                    
                    {(post.status === 'Scheduled' || post.status === 'Approved') && (
                      <button onClick={() => cancelPost(post.id)} className="px-3 py-1.5 rounded border border-white/10 text-text-muted hover:text-white text-xs font-medium transition-colors">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      
      {/* Educational Tooltip/Notice */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex gap-3">
        <ShieldAlert size={20} className="text-primary shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-white mb-1">Approval Gate Validation</h4>
          <p className="text-xs text-text-muted leading-relaxed">
            The publishing engine strictly enforces business rules. A post cannot be scheduled or published unless it carries a valid 'Approved' status and cryptographic timestamp from the client. Editing an approved post will immediately drop it from this queue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublishingPage;
