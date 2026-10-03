import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoStore } from '../../store/demoStore';
import type { Post, Client } from '../../types/demoTypes';
import { CheckCircle2, XCircle, Clock, ExternalLink, MessageSquare, AlertTriangle, ShieldCheck, CheckSquare } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const ApprovalsPage: React.FC = () => {
  const { posts, clients, currentUserRole, approvePost, requestChanges, rejectPost, submitForApproval } = useDemoStore();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Changes Requested'>('Pending');

  // For ClientApprover, they only see 'Pending Approval', 'Approved', 'Changes Requested'
  // For AccountManager, they see everything to monitor status
  const visiblePosts = posts.filter(p => {
    if (filter === 'All') return true;
    if (filter === 'Pending') return p.status === 'Pending Approval';
    if (filter === 'Approved') return p.status === 'Approved' || p.status === 'Scheduled' || p.status === 'Published';
    if (filter === 'Changes Requested') return p.status === 'Changes Requested';
    return true;
  });

  const handleAction = (action: 'approve' | 'changes' | 'reject' | 'submit', postId: string) => {
    if (action === 'approve') {
      approvePost(postId);
      setSelectedPost(null);
    } else if (action === 'changes' && comment.trim()) {
      requestChanges(postId, comment);
      setComment('');
      setSelectedPost(null);
    } else if (action === 'reject' && comment.trim()) {
      rejectPost(postId, comment);
      setComment('');
      setSelectedPost(null);
    } else if (action === 'submit') {
      submitForApproval(postId);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending Approval': return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-bold">PENDING</span>;
      case 'Approved': 
      case 'Scheduled':
      case 'Published':
        return <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-bold">APPROVED</span>;
      case 'Changes Requested': return <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs font-bold">CHANGES REQ.</span>;
      case 'Cancelled': return <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-bold">REJECTED</span>;
      case 'Draft': return <span className="px-2 py-1 bg-white/10 text-white/70 rounded text-xs font-bold">DRAFT</span>;
      default: return <span className="px-2 py-1 bg-white/10 text-white/70 rounded text-xs font-bold">{status.toUpperCase()}</span>;
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white">Approvals</h1>
          <p className="text-text-muted text-sm mt-1">Review, approve, or request changes on pending content.</p>
        </div>
        
        {/* Role Demo Banner */}
        <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-3">
          <ShieldCheck size={18} className="text-primary" />
          <span className="text-sm font-medium text-white">
            Viewing as: <span className="text-primary">{currentUserRole === 'ClientApprover' ? 'Client Approver' : 'Account Manager'}</span>
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 shrink-0 custom-scrollbar">
        {['Pending', 'Approved', 'Changes Requested', 'All'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap
              ${filter === f ? 'bg-white text-background' : 'bg-surface border border-white/10 text-text-muted hover:text-white'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* List */}
        <div className="w-full lg:w-1/3 flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-2">
          {visiblePosts.length === 0 ? (
            <div className="bg-surface border border-white/5 rounded-xl p-8 text-center text-text-muted">
              No posts found for this filter.
            </div>
          ) : (
            visiblePosts.map(post => {
              const client = clients.find(c => c.id === post.clientId);
              const isSelected = selectedPost === post.id;
              
              return (
                <div 
                  key={post.id}
                  onClick={() => setSelectedPost(post.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${isSelected ? 'bg-primary/10 border-primary shadow-md' : 'bg-surface border-white/5 hover:border-white/20'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-white line-clamp-1 flex-1 pr-2">{post.title}</span>
                    {getStatusBadge(post.status)}
                  </div>
                  <p className="text-sm text-text-muted mb-3 line-clamp-2">{post.caption}</p>
                  <div className="flex justify-between items-center text-[10px] text-text-muted/70 pt-3 border-t border-white/5">
                    <span className="font-medium text-primary">{client?.name}</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {post.scheduledAt ? format(parseISO(post.scheduledAt), 'MMM dd, HH:mm') : 'Unscheduled'}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Detail Panel */}
        <div className="hidden lg:flex flex-1 bg-surface border border-white/5 rounded-xl overflow-hidden flex-col">
          {selectedPost ? (
            <PostApprovalDetail 
              post={posts.find(p => p.id === selectedPost)!} 
              client={clients.find(c => c.id === posts.find(p => p.id === selectedPost)?.clientId)!}
              role={currentUserRole}
              onApprove={() => handleAction('approve', selectedPost)}
              onRequestChanges={(comment) => { setComment(comment); handleAction('changes', selectedPost); }}
              onReject={(comment) => { setComment(comment); handleAction('reject', selectedPost); }}
              onSubmit={() => handleAction('submit', selectedPost)}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-text-muted p-8">
              <CheckSquare size={48} className="opacity-20 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Select a post</h3>
              <p>Choose a post from the list to review details and take action.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Extracted Detail Component for clarity
const PostApprovalDetail = ({ post, client, role, onApprove, onRequestChanges, onReject, onSubmit }: any) => {
  const [comment, setComment] = useState('');
  
  const isPending = post.status === 'Pending Approval';
  const isDraft = post.status === 'Draft' || post.status === 'Changes Requested';

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-white">
            {client?.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{post.title}</h2>
            <p className="text-sm text-text-muted">{client?.name} • {post.platform}</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar flex gap-6">
         {/* Preview */}
         <div className="w-[300px] shrink-0 bg-background border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[500px]">
            <div className="h-12 border-b border-white/10 flex items-center px-4 bg-white/5 text-sm font-medium text-white gap-2">
               {post.platform} Preview
            </div>
            <div className="bg-white/5 aspect-square flex items-center justify-center overflow-hidden">
               {post.mediaUrl ? (
                 <img src={post.mediaUrl} alt="Post media" className="w-full h-full object-cover" />
               ) : (
                 <span className="text-text-muted">No Media Attached</span>
               )}
            </div>
            <div className="p-4 text-sm text-white flex-1 overflow-y-auto">
               <span className="font-bold mr-2">{client?.name}</span>
               {post.caption}
            </div>
         </div>
         
         {/* Metadata & Actions */}
         <div className="flex-1 flex flex-col">
            <div className="bg-background rounded-xl p-4 border border-white/5 mb-6">
               <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Scheduling Details</h4>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <p className="text-xs text-text-muted mb-1">Target Date</p>
                   <p className="text-sm text-white font-medium">{post.scheduledAt ? format(parseISO(post.scheduledAt), 'MMMM dd, yyyy') : 'Not set'}</p>
                 </div>
                 <div>
                   <p className="text-xs text-text-muted mb-1">Target Time</p>
                   <p className="text-sm text-white font-medium">{post.scheduledAt ? format(parseISO(post.scheduledAt), 'HH:mm a') : 'Not set'}</p>
                 </div>
               </div>
            </div>

            {post.approvalComment && (
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mb-6">
                <h4 className="text-xs font-bold text-orange-400 flex items-center gap-2 mb-2"><MessageSquare size={14} /> Review Feedback</h4>
                <p className="text-sm text-white">{post.approvalComment}</p>
              </div>
            )}
            
            <div className="mt-auto">
               {/* Client Actions */}
               {role === 'ClientApprover' && isPending && (
                 <div className="space-y-4">
                    <div className="p-4 bg-background border border-white/5 rounded-xl">
                      <label className="block text-sm font-medium text-white mb-2">Leave a comment (Optional for approval, required for changes)</label>
                      <textarea 
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Add notes for the agency..."
                        className="w-full bg-surface border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-primary resize-none h-20"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => { onRequestChanges(comment); setComment(''); }}
                        disabled={!comment.trim()}
                        className="flex-1 py-3 rounded-lg border border-orange-500/30 text-orange-400 font-medium hover:bg-orange-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Request Changes
                      </button>
                      <button 
                        onClick={onApprove}
                        className="flex-1 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-colors"
                      >
                        Approve Post
                      </button>
                    </div>
                 </div>
               )}
               
               {/* Manager Actions */}
               {role === 'AccountManager' && isDraft && (
                 <div className="flex gap-3">
                    <button 
                      onClick={onSubmit}
                      className="w-full py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium transition-colors"
                    >
                      Submit for Client Approval
                    </button>
                 </div>
               )}
               
               {/* Readonly State */}
               {((role === 'ClientApprover' && !isPending) || (role === 'AccountManager' && !isDraft)) && (
                 <div className="p-4 bg-background border border-white/5 rounded-xl flex items-center gap-3 text-text-muted">
                    <AlertTriangle size={16} />
                    <span className="text-sm">No actions available for this post in your current role.</span>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default ApprovalsPage;
