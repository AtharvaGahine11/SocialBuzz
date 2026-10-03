export type Platform = 'Instagram' | 'Facebook' | 'X' | 'LinkedIn';

export type PostStatus = 
  | 'Draft' 
  | 'Pending Approval' 
  | 'Changes Requested' 
  | 'Approved' 
  | 'Scheduled' 
  | 'Published' 
  | 'Failed' 
  | 'Cancelled';

export interface Client {
  id: string;
  name: string;
  industry: string;
  contactPerson: string;
  email: string;
  platforms: Platform[];
  totalPosts: number;
  status: 'Active' | 'Inactive';
}

export interface Post {
  id: string;
  title: string;
  clientId: string;
  platform: Platform;
  caption: string;
  mediaUrl?: string; // dummy URL or data URL
  mediaType?: 'image' | 'video';
  status: PostStatus;
  createdAt: string;
  scheduledAt?: string;
  publishedAt?: string;
  lastAttemptedAt?: string;
  retryCount: number;
  internalNotes?: string;
  approvalComment?: string; // feedback or approval comment
  approvalTimestamp?: string;
  approverId?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: string;
  read: boolean;
  relatedPostId?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  actor: string;
  entity: string;
  entityId: string;
  timestamp: string;
  details?: string;
}

export interface AnalyticsSummary {
  totalPosts: number;
  publishedPosts: number;
  failedPosts: number;
  approvalTurnaround: number; // in hours
  engagementSimulated: number;
}
