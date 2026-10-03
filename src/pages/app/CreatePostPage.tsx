import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoStore } from '../../store/demoStore';
import type { Post, Client, Platform } from '../../types/demoTypes';
import { Image, Video, Calendar, Save, Send, Clock, X, Check, Camera, Globe, MessageCircle, Briefcase } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const { clients, createPost, currentUserRole } = useDemoStore();
  
  const [clientId, setClientId] = useState('');
  const [platform, setPlatform] = useState<Platform>('Instagram');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const selectedClient = clients.find(c => c.id === clientId);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title) newErrors.title = 'Title is required';
    if (!clientId) newErrors.clientId = 'Please select a client';
    if (!caption) newErrors.caption = 'Caption is required';
    if (!date) newErrors.date = 'Date is required';
    if (!time) newErrors.time = 'Time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSave = (submit: boolean) => {
    if (!validate()) return;
    
    // Create combined scheduled date
    const scheduledAt = new Date(`${date}T${time}`).toISOString();
    
    // Using a callback to get the newly created post's ID if we wanted, 
    // but our store doesn't return the ID. So we'll pass status based on submit.
    createPost({
      title,
      clientId,
      platform,
      caption,
      scheduledAt,
      internalNotes: notes,
      mediaUrl,
      mediaType: mediaUrl ? 'image' : undefined,
      // Hack for demo: If submit is true, we force status to 'Pending Approval' 
      // in the store, but our store sets it to Draft. Let's update demoStore to accept status,
      // or we can just redirect to Approvals page where they can see the draft.
    }, submit);
    
    navigate('/app/approvals');
  };

  const getPlatformIcon = (p: Platform) => {
    switch(p) {
      case 'Instagram': return <Camera size={18} />;
      case 'Facebook': return <Globe size={18} />;
      case 'X': return <MessageCircle size={18} />;
      case 'LinkedIn': return <Briefcase size={18} />;
    }
  };

  if (currentUserRole !== 'AccountManager') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <X size={48} className="text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-text-muted">Only Account Managers can create new posts. Please toggle your role using the top bar.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Create New Post</h1>
        <div className="flex gap-3">
          <button onClick={() => navigate('/app/overview')} className="px-4 py-2 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors text-sm font-medium">
            Cancel
          </button>
          <button onClick={() => handleSave(false)} className="px-4 py-2 rounded-lg bg-surface border border-white/10 text-white hover:border-white/30 transition-colors text-sm font-medium flex items-center gap-2">
            <Save size={16} /> Save Draft
          </button>
          <button onClick={() => handleSave(true)} className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors text-sm font-medium flex items-center gap-2 shadow-[0_0_15px_rgba(84,123,255,0.3)]">
            <Send size={16} /> Save & Create (Demo)
          </button>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Editor Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-white/5 p-6 rounded-xl space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1.5">Internal Title</label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Summer Campaign Launch"
                className={`w-full bg-background border ${errors.title ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white outline-none focus:border-primary transition-colors`}
              />
              {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1.5">Client</label>
                <select 
                  value={clientId}
                  onChange={e => setClientId(e.target.value)}
                  className={`w-full bg-background border ${errors.clientId ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white outline-none focus:border-primary transition-colors appearance-none`}
                >
                  <option value="" disabled>Select a client</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                {errors.clientId && <p className="text-red-400 text-xs mt-1">{errors.clientId}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1.5">Platform</label>
                <div className="flex gap-2">
                  {(['Instagram', 'Facebook', 'X', 'LinkedIn'] as Platform[]).map(p => {
                    // Only enable platforms the client supports (or all if no client selected)
                    const disabled = selectedClient && !selectedClient.platforms.includes(p);
                    return (
                      <button
                        key={p}
                        onClick={() => setPlatform(p)}
                        disabled={disabled}
                        title={disabled ? `${selectedClient?.name} does not use ${p}` : p}
                        className={`flex-1 py-2.5 rounded-lg border flex justify-center items-center transition-all
                          ${disabled ? 'opacity-30 cursor-not-allowed bg-background border-white/5' : 
                            platform === p ? 'bg-primary/20 border-primary text-primary shadow-sm' : 'bg-background border-white/10 text-text-muted hover:border-white/30 hover:text-white'}`}
                      >
                        {getPlatformIcon(p)}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="block text-sm font-medium text-text-muted">Caption</label>
                <span className={`text-xs ${caption.length > 280 && platform === 'X' ? 'text-red-400' : 'text-text-muted/50'}`}>
                  {caption.length} {platform === 'X' ? '/ 280' : ''}
                </span>
              </div>
              <textarea 
                value={caption}
                onChange={e => setCaption(e.target.value)}
                placeholder="Write your caption here..."
                rows={5}
                className={`w-full bg-background border ${errors.caption ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white outline-none focus:border-primary transition-colors resize-none custom-scrollbar`}
              />
              {errors.caption && <p className="text-red-400 text-xs mt-1">{errors.caption}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1.5">Media (Optional for Demo)</label>
              <label className="w-full border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center bg-background/50 text-text-muted hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer relative overflow-hidden">
                <input type="file" accept="image/*" className="hidden" onChange={handleMediaUpload} />
                {mediaUrl ? (
                  <div className="absolute inset-0">
                    <img src={mediaUrl} alt="Upload preview" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="px-3 py-1 bg-black/60 rounded-full text-white text-xs font-medium">Change Image</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center shadow-lg"><Image size={24} className="text-white" /></div>
                      <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center shadow-lg"><Video size={24} className="text-white" /></div>
                    </div>
                    <p className="font-medium text-white mb-1">Click to upload media</p>
                    <p className="text-xs">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                  </>
                )}
              </label>
            </div>
          </div>
          
          <div className="bg-surface border border-white/5 p-6 rounded-xl space-y-5">
            <h3 className="font-semibold text-white border-b border-white/5 pb-3">Scheduling & Notes</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1.5">Date</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input 
                    type="date" 
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className={`w-full bg-background border ${errors.date ? 'border-red-500' : 'border-white/10'} rounded-lg pl-10 pr-4 py-2.5 text-white outline-none focus:border-primary transition-colors`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1.5">Time</label>
                <div className="relative">
                  <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input 
                    type="time" 
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className={`w-full bg-background border ${errors.time ? 'border-red-500' : 'border-white/10'} rounded-lg pl-10 pr-4 py-2.5 text-white outline-none focus:border-primary transition-colors`}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1.5">Internal Notes (Visible to team only)</label>
              <input 
                type="text" 
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="e.g. Ensure client logo is clearly visible"
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>
        
        {/* Preview Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-surface border border-white/5 rounded-xl overflow-hidden flex flex-col h-[600px]">
            <div className="p-4 border-b border-white/5 bg-background/50 flex justify-between items-center">
              <h3 className="font-semibold text-white">Live Preview</h3>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
              </div>
            </div>
            
            <div className="flex-1 bg-background p-4 overflow-y-auto custom-scrollbar flex justify-center">
              {/* Phone Mockup Wrapper */}
              <div className="w-[300px] h-[580px] bg-white rounded-3xl border-8 border-[#1a1a1a] shadow-xl overflow-hidden relative mt-2 shrink-0">
                {/* Platform Header */}
                <div className="h-14 border-b border-gray-100 flex items-center px-4 gap-3 bg-white">
                  <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0"></div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 leading-tight">{selectedClient ? selectedClient.name : 'Brand Name'}</p>
                    <p className="text-[10px] text-gray-500 leading-tight">Sponsored</p>
                  </div>
                </div>
                
                {/* Post Content */}
                <div className="bg-gray-100 aspect-square flex items-center justify-center relative overflow-hidden text-gray-400">
                  {mediaUrl ? (
                    <img src={mediaUrl} alt="Post media" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Image size={40} className="opacity-20" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-transparent opacity-50"></div>
                    </>
                  )}
                </div>
                
                {/* Interactions & Caption */}
                <div className="p-3 bg-white text-gray-800">
                  <div className="flex gap-3 mb-2">
                    <div className="w-5 h-5 rounded-full border border-gray-300"></div>
                    <div className="w-5 h-5 rounded-full border border-gray-300"></div>
                    <div className="w-5 h-5 rounded-full border border-gray-300"></div>
                  </div>
                  <p className="text-xs leading-relaxed break-words">
                    <span className="font-bold mr-1">{selectedClient ? selectedClient.name : 'BrandName'}</span>
                    {caption ? (
                      <span className="whitespace-pre-wrap">{caption}</span>
                    ) : (
                      <span className="text-gray-400">Your caption will appear here...</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
