import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Client, Post, Notification, AuditLog, AnalyticsSummary, PostStatus } from '../types/demoTypes';
import { addDays, subDays } from 'date-fns';

const DUMMY_CLIENTS: Client[] = [
  { id: 'c1', name: 'Apex Athletics', industry: 'Sports & Fitness', contactPerson: 'Sarah Jenkins', email: 'sarah@apexathletics.demo', platforms: ['Instagram', 'Facebook'], totalPosts: 45, status: 'Active' },
  { id: 'c2', name: 'Lumina Tech', industry: 'B2B Software', contactPerson: 'David Chen', email: 'david@lumina.demo', platforms: ['LinkedIn', 'X'], totalPosts: 120, status: 'Active' },
  { id: 'c3', name: 'Bistro 42', industry: 'Hospitality', contactPerson: 'Marco Rossi', email: 'marco@bistro42.demo', platforms: ['Instagram', 'Facebook'], totalPosts: 230, status: 'Active' },
  { id: 'c4', name: 'EcoLiving', industry: 'Retail', contactPerson: 'Emma Watson', email: 'emma@ecoliving.demo', platforms: ['Instagram', 'Facebook', 'X'], totalPosts: 85, status: 'Active' },
  { id: 'c5', name: 'FinTrust', industry: 'Finance', contactPerson: 'James Smith', email: 'james@fintrust.demo', platforms: ['LinkedIn', 'X'], totalPosts: 15, status: 'Active' },
  { id: 'c6', name: 'Nexus Gaming', industry: 'Entertainment', contactPerson: 'Alex Rivera', email: 'alex@nexus.demo', platforms: ['X', 'Instagram'], totalPosts: 310, status: 'Active' },
  { id: 'c7', name: 'Zenith Health', industry: 'Healthcare', contactPerson: 'Dr. Sarah Lee', email: 'sarah.lee@zenith.demo', platforms: ['Facebook', 'LinkedIn'], totalPosts: 40, status: 'Active' },
  { id: 'c8', name: 'Urban Threads', industry: 'Fashion', contactPerson: 'Chris Johnson', email: 'chris@urbanthreads.demo', platforms: ['Instagram'], totalPosts: 500, status: 'Active' },
  { id: 'c9', name: 'Global Logistics', industry: 'Transportation', contactPerson: 'Michael Brown', email: 'michael@global.demo', platforms: ['LinkedIn'], totalPosts: 22, status: 'Active' },
  { id: 'c10', name: 'Nova Education', industry: 'Education', contactPerson: 'Jessica Davis', email: 'jessica@nova.demo', platforms: ['Facebook', 'Instagram'], totalPosts: 65, status: 'Active' },
  { id: 'c11', name: 'Pinnacle Real Estate', industry: 'Real Estate', contactPerson: 'Robert Wilson', email: 'robert@pinnacle.demo', platforms: ['Facebook', 'Instagram', 'LinkedIn'], totalPosts: 110, status: 'Active' },
  { id: 'c12', name: 'Quantum Robotics', industry: 'Technology', contactPerson: 'Lisa Taylor', email: 'lisa@quantum.demo', platforms: ['LinkedIn', 'X'], totalPosts: 34, status: 'Active' },
];

const now = new Date();

const DUMMY_POSTS: Post[] = [
  {
    id: 'p1', title: 'Summer Sale Announcement', clientId: 'c4', platform: 'Instagram', caption: 'Get 20% off all eco-friendly products this weekend! 🌱 #EcoLiving #Sale',
    status: 'Pending Approval', createdAt: subDays(now, 2).toISOString(), scheduledAt: addDays(now, 2).toISOString(), retryCount: 0
  },
  {
    id: 'p2', title: 'New Feature Release', clientId: 'c2', platform: 'LinkedIn', caption: 'We are thrilled to announce v2.0 of Lumina Cloud. Read more about our new security features on the blog. 🚀',
    status: 'Approved', createdAt: subDays(now, 3).toISOString(), scheduledAt: addDays(now, 1).toISOString(), retryCount: 0, approvalTimestamp: subDays(now, 1).toISOString()
  },
  {
    id: 'p3', title: 'Weekend Menu Special', clientId: 'c3', platform: 'Facebook', caption: 'Try our new Truffle Pasta this weekend at Bistro 42! 🍝',
    status: 'Published', createdAt: subDays(now, 5).toISOString(), scheduledAt: subDays(now, 1).toISOString(), publishedAt: subDays(now, 1).toISOString(), retryCount: 0, approvalTimestamp: subDays(now, 2).toISOString()
  },
  {
    id: 'p4', title: 'Q3 Financial Tips', clientId: 'c5', platform: 'X', caption: '3 tips for managing your portfolio in Q3. Thread 🧵',
    status: 'Changes Requested', createdAt: subDays(now, 1).toISOString(), scheduledAt: addDays(now, 4).toISOString(), retryCount: 0, approvalComment: 'Can we add a disclaimer about market risks?'
  },
  {
    id: 'p5', title: 'Athlete Spotlight', clientId: 'c1', platform: 'Instagram', caption: 'Meet our new brand ambassador! 🏃‍♀️',
    status: 'Scheduled', createdAt: subDays(now, 4).toISOString(), scheduledAt: addDays(now, 0).toISOString(), retryCount: 0, approvalTimestamp: subDays(now, 1).toISOString()
  },
  {
    id: 'p6', title: 'Server Maintenance', clientId: 'c2', platform: 'X', caption: 'Scheduled maintenance this Sunday 2AM EST.',
    status: 'Failed', createdAt: subDays(now, 2).toISOString(), scheduledAt: subDays(now, 0).toISOString(), lastAttemptedAt: subDays(now, 0).toISOString(), retryCount: 1, approvalTimestamp: subDays(now, 1).toISOString(), internalNotes: 'API token expired'
  },
  {
    id: 'p7', title: 'Winter Collection Teaser', clientId: 'c8', platform: 'Instagram', caption: 'Something cozy is coming... ❄️',
    status: 'Draft', createdAt: new Date().toISOString(), retryCount: 0
  }
];

interface DemoState {
  clients: Client[];
  posts: Post[];
  notifications: Notification[];
  auditLogs: AuditLog[];
  currentUserRole: 'AccountManager' | 'ClientApprover' | 'Admin';
  toggleRole: () => void;
  resetDemoData: () => void;

  // Post Actions
  createPost: (post: Omit<Post, 'id' | 'createdAt' | 'status' | 'retryCount'>, submit?: boolean) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  submitForApproval: (id: string) => void;
  approvePost: (id: string) => void;
  requestChanges: (id: string, comment: string) => void;
  rejectPost: (id: string, reason: string) => void;
  schedulePost: (id: string) => void;
  simulatePublishing: (id: string, success: boolean) => void;
  cancelPost: (id: string) => void;
  
  // Notification & Logs
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addAuditLog: (action: string, entity: string, entityId: string, details?: string) => void;
}

export const useDemoStore = create<DemoState>()(
  persist(
    (set, get) => ({
      clients: DUMMY_CLIENTS,
      posts: DUMMY_POSTS,
      notifications: [
        { id: 'n1', title: 'Welcome to SocialBuzz', message: 'This is a frontend prototype. Use the toggle below to switch roles.', type: 'info', createdAt: now.toISOString(), read: false }
      ],
      auditLogs: [],
      currentUserRole: 'AccountManager',

      toggleRole: () => set((state) => ({ 
        currentUserRole: state.currentUserRole === 'AccountManager' ? 'ClientApprover' : 'AccountManager' 
      })),

      resetDemoData: () => set({
        clients: DUMMY_CLIENTS,
        posts: DUMMY_POSTS,
        notifications: [],
        auditLogs: [],
      }),

      addAuditLog: (action, entity, entityId, details) => {
        const log: AuditLog = {
          id: uuidv4(),
          action,
          actor: get().currentUserRole,
          entity,
          entityId,
          timestamp: new Date().toISOString(),
          details
        };
        set((state) => ({ auditLogs: [log, ...state.auditLogs] }));
      },

      createPost: (postData, submit = false) => {
        const newPost: Post = {
          ...postData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          status: submit ? 'Pending Approval' : 'Draft',
          retryCount: 0
        };
        set((state) => {
          const newState = { posts: [newPost, ...state.posts], auditLogs: state.auditLogs, notifications: state.notifications };
          if (submit) {
             newState.notifications = [{
                id: uuidv4(), title: 'Approval Required', message: 'A new post is awaiting your approval.', type: 'warning', createdAt: new Date().toISOString(), read: false, relatedPostId: newPost.id
             }, ...state.notifications];
          }
          return newState;
        });
        get().addAuditLog(submit ? 'Created & Submitted Post' : 'Created Post Draft', 'Post', newPost.id);
      },

      updatePost: (id, updates) => {
        set((state) => {
          const updatedPosts = state.posts.map(p => {
            if (p.id === id) {
              // If editing an approved post, invalidate approval
              if (p.status === 'Approved' || p.status === 'Scheduled') {
                return { ...p, ...updates, status: 'Draft', approvalTimestamp: undefined, approverId: undefined };
              }
              return { ...p, ...updates };
            }
            return p;
          });
          return { posts: updatedPosts };
        });
        get().addAuditLog('Updated Post', 'Post', id, 'Modified post details');
      },

      submitForApproval: (id) => {
        set((state) => ({
          posts: state.posts.map(p => p.id === id ? { ...p, status: 'Pending Approval' } : p),
          notifications: [{
            id: uuidv4(), title: 'Approval Required', message: 'A new post is awaiting your approval.', type: 'warning', createdAt: new Date().toISOString(), read: false, relatedPostId: id
          }, ...state.notifications]
        }));
        get().addAuditLog('Submitted for Approval', 'Post', id);
      },

      approvePost: (id) => {
        set((state) => ({
          posts: state.posts.map(p => p.id === id ? { ...p, status: 'Approved', approvalTimestamp: new Date().toISOString() } : p),
          notifications: [{
            id: uuidv4(), title: 'Post Approved', message: 'Client approved the post.', type: 'success', createdAt: new Date().toISOString(), read: false, relatedPostId: id
          }, ...state.notifications]
        }));
        get().addAuditLog('Approved Post', 'Post', id);
      },

      requestChanges: (id, comment) => {
        set((state) => ({
          posts: state.posts.map(p => p.id === id ? { ...p, status: 'Changes Requested', approvalComment: comment } : p),
          notifications: [{
            id: uuidv4(), title: 'Changes Requested', message: 'Client requested changes on a post.', type: 'info', createdAt: new Date().toISOString(), read: false, relatedPostId: id
          }, ...state.notifications]
        }));
        get().addAuditLog('Requested Changes', 'Post', id, comment);
      },

      rejectPost: (id, reason) => {
        set((state) => ({
          posts: state.posts.map(p => p.id === id ? { ...p, status: 'Cancelled', approvalComment: reason } : p),
          notifications: [{
            id: uuidv4(), title: 'Post Rejected', message: 'Client rejected the post.', type: 'error', createdAt: new Date().toISOString(), read: false, relatedPostId: id
          }, ...state.notifications]
        }));
        get().addAuditLog('Rejected Post', 'Post', id, reason);
      },

      schedulePost: (id) => {
        set((state) => ({
          posts: state.posts.map(p => p.id === id && p.status === 'Approved' ? { ...p, status: 'Scheduled' } : p)
        }));
        get().addAuditLog('Scheduled Post', 'Post', id);
      },

      simulatePublishing: (id, success) => {
        set((state) => ({
          posts: state.posts.map(p => {
            if (p.id === id) {
              if (success) {
                return { ...p, status: 'Published', publishedAt: new Date().toISOString(), lastAttemptedAt: new Date().toISOString() };
              } else {
                return { ...p, status: 'Failed', retryCount: p.retryCount + 1, lastAttemptedAt: new Date().toISOString() };
              }
            }
            return p;
          }),
          notifications: [{
            id: uuidv4(), title: success ? 'Publishing Success' : 'Publishing Failed', message: success ? 'Post published successfully.' : 'Post failed to publish. Check queue.', type: success ? 'success' : 'error', createdAt: new Date().toISOString(), read: false, relatedPostId: id
          }, ...state.notifications]
        }));
        get().addAuditLog(success ? 'Simulated Publish Success' : 'Simulated Publish Failure', 'Post', id);
      },

      cancelPost: (id) => {
        set((state) => ({
          posts: state.posts.map(p => p.id === id ? { ...p, status: 'Cancelled' } : p)
        }));
        get().addAuditLog('Cancelled Post', 'Post', id);
      },

      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
      })),
      
      markAllNotificationsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true }))
      }))
    }),
    {
      name: 'socialbuzz-demo-storage',
    }
  )
);
