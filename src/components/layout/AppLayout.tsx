import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Calendar, Edit3, CheckSquare, 
  Send, BarChart2, Users, Bell, FileText, Settings,
  LogOut, Menu, X
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const notifications = useDemoStore(state => state.notifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { name: 'Overview', path: '/app/overview', icon: <LayoutDashboard size={20} /> },
    { name: 'Calendar', path: '/app/calendar', icon: <Calendar size={20} /> },
    { name: 'Create Post', path: '/app/create', icon: <Edit3 size={20} /> },
    { name: 'Approvals', path: '/app/approvals', icon: <CheckSquare size={20} /> },
    { name: 'Publishing', path: '/app/publishing', icon: <Send size={20} /> },
    { name: 'Analytics', path: '/app/analytics', icon: <BarChart2 size={20} /> },
    { name: 'Clients', path: '/app/clients', icon: <Users size={20} /> },
  ];

  const bottomItems = [
    { name: 'Notifications', path: '/app/notifications', icon: <Bell size={20} />, badge: unreadCount },
    { name: 'Audit Logs', path: '/app/audit-logs', icon: <FileText size={20} /> },
    { name: 'Settings', path: '/app/settings', icon: <Settings size={20} /> },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans text-text selection:bg-primary/30 selection:text-white">
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="hidden md:flex flex-col bg-surface border-r border-white/5 h-full z-20 shrink-0"
      >
        <div className="h-16 flex items-center px-6 border-b border-white/5 justify-between">
          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-violet flex items-center justify-center font-bold text-white shadow-lg">
                  S
                </div>
                <span className="font-bold text-lg text-white">SocialBuzz</span>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex justify-center cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-violet flex items-center justify-center font-bold text-white shadow-lg">
                  S
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1 custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-text-muted hover:bg-white/5 hover:text-white'}
                ${!sidebarOpen ? 'justify-center' : ''}
              `}
            >
              {item.icon}
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="whitespace-nowrap overflow-hidden">
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}

          <div className="mt-8 mb-2 px-4">
            <div className="h-px w-full bg-white/5" />
          </div>

          {bottomItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative
                ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-text-muted hover:bg-white/5 hover:text-white'}
                ${!sidebarOpen ? 'justify-center' : ''}
              `}
            >
              <div className="relative">
                {item.icon}
                {item.badge && item.badge > 0 && !sidebarOpen && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-surface" />
                )}
              </div>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="whitespace-nowrap flex-1 overflow-hidden">
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
              {sidebarOpen && item.badge && item.badge > 0 && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                  {item.badge}
                </motion.span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="p-4 border-t border-white/5">
           <button onClick={() => navigate('/')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:bg-white/5 hover:text-white transition-all ${!sidebarOpen ? 'justify-center' : ''}`}>
              <LogOut size={20} />
              {sidebarOpen && <span>Exit to Site</span>}
           </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-background">
        {/* Topbar */}
        <header className="h-16 shrink-0 border-b border-white/5 flex items-center justify-between px-4 lg:px-8 z-10 bg-surface/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="hidden md:flex p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors">
              <Menu size={20} />
            </button>
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors">
              <Menu size={24} />
            </button>
            
            {/* Context/Title (Could be dynamic based on route) */}
            <div className="h-6 w-px bg-white/10 mx-2 hidden md:block" />
            <span className="text-sm font-medium text-text-muted hidden md:block">Prototype Mode</span>
          </div>

          <div className="flex items-center gap-4">
             {/* Role Toggle for Demo */}
             <RoleToggle />
             
             {/* Simple User Profile */}
             <div className="flex items-center gap-3 pl-4 border-l border-white/5">
                <div className="text-right hidden sm:block">
                   <p className="text-sm font-medium text-white">Demo User</p>
                   <p className="text-[10px] text-text-muted uppercase tracking-wider">SocialBuzz App</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center font-bold text-white shadow-lg border-2 border-surface">
                   DU
                </div>
             </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8 custom-scrollbar">
          <Outlet />
        </div>
      </main>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
             <motion.div 
               initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
               transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
               className="w-72 h-full bg-surface border-r border-white/5 flex flex-col shadow-2xl"
               onClick={e => e.stopPropagation()}
             >
                <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
                   <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                     <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-violet flex items-center justify-center font-bold text-white shadow-lg">
                       S
                     </div>
                     <span className="font-bold text-lg text-white">SocialBuzz</span>
                   </div>
                   <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-text-muted hover:text-white">
                      <X size={20} />
                   </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-3 py-3 rounded-lg transition-all
                        ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-text-muted hover:bg-white/5 hover:text-white'}
                      `}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </NavLink>
                  ))}

                  <div className="my-4 px-4"><div className="h-px w-full bg-white/5" /></div>

                  {bottomItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-3 py-3 rounded-lg transition-all relative
                        ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-text-muted hover:bg-white/5 hover:text-white'}
                      `}
                    >
                      {item.icon}
                      <span className="flex-1">{item.name}</span>
                      {item.badge && item.badge > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  ))}
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RoleToggle = () => {
  const role = useDemoStore(state => state.currentUserRole);
  const toggle = useDemoStore(state => state.toggleRole);

  return (
    <div className="flex items-center gap-2 bg-background border border-white/10 rounded-full p-1 shadow-inner">
      <button 
        onClick={() => role !== 'AccountManager' && toggle()}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${role === 'AccountManager' ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:text-white'}`}
      >
        Manager
      </button>
      <button 
        onClick={() => role !== 'ClientApprover' && toggle()}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${role === 'ClientApprover' ? 'bg-accent text-white shadow-md' : 'text-text-muted hover:text-white'}`}
      >
        Client
      </button>
    </div>
  );
};

export default AppLayout;
