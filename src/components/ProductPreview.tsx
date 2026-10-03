import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { 
  LayoutDashboard, 
  Calendar, 
  CheckSquare, 
  Bell, 
  Search
} from 'lucide-react';
import { UPCOMING_POSTS, APPROVAL_ACTIVITY, METRICS } from '../data/demoData';

const ProductPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'approvals'>('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Top Metrics Row */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Total Posts", value: "248" },
                { label: "Pending Approvals", value: METRICS.unapprovedPosts.toString(), alert: true },
                { label: "Scheduled", value: "12" },
                { label: "Failed Jobs", value: "0" }
              ].map((stat, i) => (
                <div key={i} className="bg-surface border border-white/5 p-4 rounded-xl">
                  <p className="text-xs text-text-muted mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.alert ? 'text-accent' : 'text-white'}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* Upcoming Posts */}
              <div className="col-span-2 bg-surface border border-white/5 rounded-xl p-5">
                <h3 className="text-sm font-medium text-white mb-4">Upcoming Content</h3>
                <div className="space-y-3">
                  {UPCOMING_POSTS.map(post => (
                    <div key={post.id} className="flex items-center justify-between p-3 bg-surface-light rounded-lg border border-white/5">
                      <div className="flex flex-col">
                        <span className="text-sm text-white">{post.content}</span>
                        <span className="text-xs text-text-muted">{post.platform} • {post.date}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-md ${
                        post.status === 'Approved' ? 'bg-green-500/20 text-green-400' :
                        post.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {post.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Feed */}
              <div className="bg-surface border border-white/5 rounded-xl p-5">
                <h3 className="text-sm font-medium text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {APPROVAL_ACTIVITY.map(act => (
                    <div key={act.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-white leading-tight">{act.action}</p>
                        <p className="text-[10px] text-text-muted mt-1">{act.user} • {act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'calendar':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-surface border border-white/5 rounded-xl p-5 h-full flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-medium text-white">October 2026</h3>
              <div className="flex gap-2">
                <div className="px-3 py-1 text-xs bg-surface-light rounded border border-white/10 text-white">Month</div>
                <div className="px-3 py-1 text-xs text-text-muted">Week</div>
              </div>
            </div>
            {/* Mock Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 flex-1">
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                <div key={d} className="text-center text-xs text-text-muted pb-2">{d}</div>
              ))}
              {Array.from({length: 31}).map((_, i) => (
                <div key={i} className={`rounded bg-surface-light border border-white/5 p-1 min-h-[60px] ${i === 14 ? 'border-primary/50' : ''}`}>
                  <span className="text-[10px] text-text-muted block text-right">{i+1}</span>
                  {i === 14 && <div className="mt-1 bg-primary/20 text-primary text-[8px] px-1 py-0.5 rounded truncate">Product Teaser</div>}
                  {i === 17 && <div className="mt-1 bg-green-500/20 text-green-400 text-[8px] px-1 py-0.5 rounded truncate">Spotlight</div>}
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'approvals':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="bg-surface border border-white/5 rounded-xl p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="inline-block px-2 py-1 bg-yellow-500/20 text-yellow-400 text-[10px] uppercase rounded mb-2">Needs Review</div>
                  <h3 className="text-lg font-medium text-white">Q4 Campaign Announcement</h3>
                  <p className="text-sm text-text-muted mt-1">Client: Acme Corp • Scheduled: Nov 1, 09:00 AM</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-green-500/20 text-green-400 text-sm font-medium rounded hover:bg-green-500/30 transition-colors">Approve</button>
                  <button className="px-4 py-2 bg-surface-light text-white text-sm font-medium rounded hover:bg-white/10 transition-colors">Request Changes</button>
                </div>
              </div>
              <div className="w-full h-48 bg-surface-light rounded-lg border border-white/5 flex items-center justify-center text-text-muted text-sm">
                [ Content Preview Image Placeholder ]
              </div>
              <div className="mt-4 p-4 bg-surface-light rounded-lg border border-white/5">
                <p className="text-sm text-white">"We are thrilled to announce our new product line for the upcoming season! Stay tuned for more details..."</p>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <section id="preview" className="py-24 bg-surface relative">
      <div className="container mx-auto px-6">
        <SectionHeading 
          headline="A workspace built for clarity." 
          subheadline="Everything your team needs, without the clutter."
        />

        <div className="mt-16 max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-widest">
              Interactive Concept Preview
            </span>
          </div>

          {/* Browser Frame */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[700px]"
          >
            {/* Fake Browser Header */}
            <div className="h-12 bg-surface-light border-b border-white/5 flex items-center px-4 gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 max-w-xl mx-auto h-6 bg-background rounded border border-white/5 flex items-center justify-center text-[10px] text-text-muted font-mono">
                app.socialbuzz.example.com
              </div>
            </div>

            {/* App Layout */}
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <div className="w-64 bg-surface-light border-r border-white/5 p-4 flex flex-col hidden md:flex">
                <div className="flex items-center gap-2 mb-8 px-2">
                  <div className="w-6 h-6 rounded bg-primary" />
                  <span className="font-bold text-white">SocialBuzz</span>
                </div>
                
                <div className="space-y-1">
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'overview' ? 'bg-primary/20 text-primary' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
                  >
                    <LayoutDashboard size={18} /> Overview
                  </button>
                  <button 
                    onClick={() => setActiveTab('calendar')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'calendar' ? 'bg-primary/20 text-primary' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
                  >
                    <Calendar size={18} /> Calendar
                  </button>
                  <button 
                    onClick={() => setActiveTab('approvals')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'approvals' ? 'bg-primary/20 text-primary' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
                  >
                    <CheckSquare size={18} /> Approvals
                  </button>
                </div>
              </div>

              {/* Main Area */}
              <div className="flex-1 flex flex-col bg-background">
                {/* Topbar */}
                <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-surface/50 backdrop-blur-sm">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded-md border border-white/5 text-sm text-white cursor-pointer">
                    Acme Corp Workspace
                  </div>
                  <div className="flex items-center gap-4 text-text-muted">
                    <Search size={18} className="cursor-pointer hover:text-white" />
                    <Bell size={18} className="cursor-pointer hover:text-white" />
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-secondary to-primary cursor-pointer" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    {renderContent()}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;
