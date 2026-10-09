import { Injectable, signal } from '@angular/core';
import { Incident, IncidentPriority, IncidentStatus, IncidentComment } from '../models/incident.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private initialIncidents: Incident[] = [
    {
      id: 'INC-00124',
      title: 'Database connection failure',
      priority: 'critical',
      status: 'open',
      category: 'Database',
      description:
        'The application cannot connect to the primary database. Users are experiencing intermittent service disruptions. The issue requires investigation by the responsible team.',
      assignedTeam: 'DevOps Team',
      assignee: 'John Silva',
      reportedBy: 'Ulindu',
      slaStatus: 'Within SLA',
      createdAt: 'Oct 08, 2026',
      comments: [
        {
          id: 'c1',
          author: 'John Silva',
          authorInitial: 'J',
          timestamp: 'Today, 09:45 AM',
          content: 'Investigating the database connectivity issue. Checking the connection pool and server logs.',
        },
        {
          id: 'c2',
          author: 'Ulindu',
          authorInitial: 'U',
          timestamp: 'Today, 09:30 AM',
          content: 'Incident reported and assigned for investigation.',
        },
      ],
    },
    {
      id: 'INC-00123',
      title: 'API response timeout',
      priority: 'high',
      status: 'investigating',
      category: 'Application',
      description:
        'The payment API endpoints are timing out after 30 seconds under peak load.',
      assignedTeam: 'Backend Team',
      assignee: 'Sarah Perera',
      reportedBy: 'Dev Team',
      slaStatus: 'Within SLA',
      createdAt: 'Oct 08, 2026',
      comments: [
        {
          id: 'c3',
          author: 'Sarah Perera',
          authorInitial: 'S',
          timestamp: 'Yesterday, 04:15 PM',
          content: 'Analyzing downstream microservice latency metrics.',
        },
      ],
    },
    {
      id: 'INC-00122',
      title: 'Authentication service error',
      priority: 'medium',
      status: 'resolved',
      category: 'Security',
      description:
        'Intermittent token validation failures reported by SSO users.',
      assignedTeam: 'Security Team',
      assignee: 'Michael Fernando',
      reportedBy: 'Support Team',
      slaStatus: 'Met SLA',
      createdAt: 'Oct 07, 2026',
      comments: [],
    },
    {
      id: 'INC-00121',
      title: 'Server CPU usage high',
      priority: 'low',
      status: 'closed',
      category: 'Infrastructure',
      description:
        'App server 03 CPU reached 95% threshold during nightly cron job.',
      assignedTeam: 'DevOps Team',
      assignee: 'David Perera',
      reportedBy: 'System Monitor',
      slaStatus: 'Met SLA',
      createdAt: 'Oct 07, 2026',
      comments: [],
    },
    {
      id: 'INC-00120',
      title: 'Payment gateway latency spike',
      priority: 'critical',
      status: 'investigating',
      category: 'Application',
      description:
        'Third party payment gateway API response time exceeds 4000ms.',
      assignedTeam: 'DevOps Team',
      assignee: 'Kamal Gunaratne',
      reportedBy: 'Ulindu',
      slaStatus: 'At Risk',
      createdAt: 'Oct 06, 2026',
      comments: [],
    },
    {
      id: 'INC-00119',
      title: 'Email notification service delayed',
      priority: 'medium',
      status: 'open',
      category: 'Application',
      description:
        'Outgoing password reset and alert emails are delayed by 15-20 minutes.',
      assignedTeam: 'Support Team',
      assignee: 'Nimali Jayawardena',
      reportedBy: 'Customer Support',
      slaStatus: 'Within SLA',
      createdAt: 'Oct 06, 2026',
      comments: [],
    },
  ];

  incidents = signal<Incident[]>(this.initialIncidents);

  getIncidentById(id: string): Incident | undefined {
    return this.incidents().find((inc) => inc.id.toLowerCase() === id.toLowerCase());
  }

  updateIncident(id: string, updatedFields: Partial<Incident>): boolean {
    let updated = false;
    this.incidents.update((list) =>
      list.map((inc) => {
        if (inc.id.toLowerCase() === id.toLowerCase()) {
          updated = true;
          return {
            ...inc,
            ...updatedFields,
          };
        }
        return inc;
      })
    );
    return updated;
  }

  updateStatus(id: string, newStatus: IncidentStatus, commentText?: string): boolean {
    let updated = false;
    this.incidents.update((list) =>
      list.map((inc) => {
        if (inc.id.toLowerCase() === id.toLowerCase()) {
          updated = true;
          const comments = inc.comments ? [...inc.comments] : [];
          if (commentText?.trim()) {
            comments.unshift({
              id: 'c-' + Date.now(),
              author: 'You',
              authorInitial: 'Y',
              timestamp: 'Just now',
              content: `Status updated to ${newStatus.toUpperCase()}: ${commentText.trim()}`,
            });
          }
          return {
            ...inc,
            status: newStatus,
            comments,
          };
        }
        return inc;
      })
    );
    return updated;
  }

  addComment(id: string, content: string, author: string = 'You'): boolean {
    if (!content.trim()) return false;
    let added = false;
    this.incidents.update((list) =>
      list.map((inc) => {
        if (inc.id.toLowerCase() === id.toLowerCase()) {
          added = true;
          const comments = inc.comments ? [...inc.comments] : [];
          comments.unshift({
            id: 'c-' + Date.now(),
            author,
            authorInitial: author.charAt(0).toUpperCase() || 'U',
            timestamp: 'Just now',
            content: content.trim(),
          });
          return {
            ...inc,
            comments,
          };
        }
        return inc;
      })
    );
    return added;
  }

  createIncident(incidentData: {
    title: string;
    priority: IncidentPriority;
    category?: string;
    description?: string;
    assignedTeam?: string;
    assignee?: string;
  }): Incident {
    const nextNumber = this.incidents().length + 125;
    const newId = `INC-${String(nextNumber).padStart(5, '0')}`;
    const newIncident: Incident = {
      id: newId,
      title: incidentData.title,
      priority: incidentData.priority || 'medium',
      status: 'open',
      category: incidentData.category || 'General',
      description: incidentData.description || '',
      assignedTeam: incidentData.assignedTeam || 'Support Team',
      assignee: incidentData.assignee || 'Unassigned',
      reportedBy: 'Ulindu',
      slaStatus: 'Within SLA',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      comments: [
        {
          id: 'c-' + Date.now(),
          author: 'Ulindu',
          authorInitial: 'U',
          timestamp: 'Just now',
          content: 'Incident reported.',
        },
      ],
    };

    this.incidents.update((list) => [newIncident, ...list]);
    return newIncident;
  }
}
