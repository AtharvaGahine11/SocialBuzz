import React from 'react';
import { useDemoStore } from '../../store/demoStore';
import { format, parseISO } from 'date-fns';
import { Shield, Activity, User, FileText } from 'lucide-react';

const AuditLogsPage: React.FC = () => {
  const { auditLogs } = useDemoStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield size={24} className="text-primary" /> Audit Logs
          </h1>
          <p className="text-text-muted text-sm mt-1">Immutable record of critical prototype actions.</p>
        </div>
      </div>

      <div className="bg-surface border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-background/50 border-b border-white/5 text-xs uppercase font-bold text-text-muted">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Actor</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Entity</th>
                <th className="px-6 py-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {auditLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-text-muted">No audit logs available.</td>
                </tr>
              ) : (
                auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-text-muted">{format(parseISO(log.timestamp), 'MMM dd, HH:mm:ss')}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 text-white">
                        <User size={14} className="text-text-muted" />
                        {log.actor}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 text-white font-medium">
                        <Activity size={14} className="text-primary" />
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 text-text-muted">
                        <FileText size={14} />
                        {log.entity} <span className="text-[10px] opacity-50">({log.entityId.substring(0, 8)})</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-muted truncate max-w-[200px]">{log.details || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLogsPage;
