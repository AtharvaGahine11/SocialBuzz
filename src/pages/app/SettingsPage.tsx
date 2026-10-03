import React, { useState } from 'react';
import { useDemoStore } from '../../store/demoStore';
import { Settings, Save, AlertTriangle, RefreshCcw } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { resetDemoData } = useDemoStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleReset = () => {
    resetDemoData();
    setShowConfirm(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings size={24} className="text-primary" /> Settings
          </h1>
          <p className="text-text-muted text-sm mt-1">Manage prototype preferences and data.</p>
        </div>
      </div>

      <div className="bg-surface border border-white/5 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-semibold text-white mb-1">Prototype Display Options</h3>
          <p className="text-sm text-text-muted mb-4">These settings are illustrative and do not persist outside this session.</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <p className="font-medium text-white">Dark Mode</p>
                <p className="text-xs text-text-muted">Currently forced to True for branding consistency.</p>
              </div>
              <div className="w-10 h-5 bg-primary rounded-full relative cursor-not-allowed opacity-50">
                <div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-white">Email Notifications</p>
                <p className="text-xs text-text-muted">Simulate sending emails on approval events.</p>
              </div>
              <div className="w-10 h-5 bg-white/20 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-0.5 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-red-500/5">
          <h3 className="text-lg font-semibold text-red-400 mb-1 flex items-center gap-2">
            <AlertTriangle size={18} /> Danger Zone
          </h3>
          <p className="text-sm text-text-muted mb-4">Resetting demo data will restore all posts, clients, and logs to their original seeded states. This cannot be undone.</p>
          
          {showConfirm ? (
            <div className="p-4 bg-background border border-red-500/30 rounded-lg flex items-center justify-between">
              <span className="text-sm text-white">Are you absolutely sure?</span>
              <div className="flex gap-2">
                <button onClick={() => setShowConfirm(false)} className="px-3 py-1.5 rounded-lg text-sm font-medium text-text-muted hover:text-white transition-colors">Cancel</button>
                <button onClick={handleReset} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition-colors flex items-center gap-2">
                  <RefreshCcw size={14} /> Yes, Reset Data
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowConfirm(true)} className="px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 font-medium text-sm transition-colors">
              Reset Demo Data
            </button>
          )}
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-lg shadow-xl font-medium text-sm flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <CheckCircle2 size={18} />
          Demo data restored successfully.
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
