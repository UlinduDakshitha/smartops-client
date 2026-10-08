export type IncidentPriority = 'critical' | 'high' | 'medium' | 'low';
export type IncidentStatus = 'open' | 'investigating' | 'resolved' | 'closed';

export interface Incident {
  id: string;
  title: string;
  priority: IncidentPriority;
  status: IncidentStatus;
  assignee: string;
  createdAt: string;
}
