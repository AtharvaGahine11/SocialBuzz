import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AppLayout from './components/layout/AppLayout';

import OverviewPage from './pages/app/OverviewPage';
import CreatePostPage from './pages/app/CreatePostPage';
import ApprovalsPage from './pages/app/ApprovalsPage';
import PublishingPage from './pages/app/PublishingPage';
import CalendarPage from './pages/app/CalendarPage';

import AnalyticsPage from './pages/app/AnalyticsPage';
import ClientsPage from './pages/app/ClientsPage';
import NotificationsPage from './pages/app/NotificationsPage';
import AuditLogsPage from './pages/app/AuditLogsPage';
import SettingsPage from './pages/app/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/app/overview" replace />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="create" element={<CreatePostPage />} />
          <Route path="approvals" element={<ApprovalsPage />} />
          <Route path="publishing" element={<PublishingPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
