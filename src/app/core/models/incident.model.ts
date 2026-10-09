export type IncidentPriority = 'critical' | 'high' | 'medium' | 'low';
export type IncidentStatus = 'open' | 'investigating' | 'resolved' | 'closed';

export interface IncidentComment {
  id: string;
  author: string;
  authorInitial: string;
  timestamp: string;
  content: string;
}

export interface Incident {
  id: string;
  title: string;
  priority: IncidentPriority;
  status: IncidentStatus;
  assignee: string;
  createdAt: string;
  description?: string;
  category?: string;
  assignedTeam?: string;
  reportedBy?: string;
  slaStatus?: string;
  comments?: IncidentComment[];
}

