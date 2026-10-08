import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Incident } from '../../../core/models/incident.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-incident-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './incident-list.html',
  styleUrl: './incident-list.css',
})
export class IncidentList {
  searchTerm = signal<string>('');
  selectedPriority = signal<string>('');
  selectedStatus = signal<string>('');

  incidents = signal<Incident[]>([
    {
      id: 'INC-00124',
      title: 'Database connection failure',
      priority: 'critical',
      status: 'open',
      assignee: 'John Silva',
      createdAt: 'Oct 08, 2026',
    },
    {
      id: 'INC-00123',
      title: 'API response timeout',
      priority: 'high',
      status: 'investigating',
      assignee: 'Sarah Perera',
      createdAt: 'Oct 08, 2026',
    },
    {
      id: 'INC-00122',
      title: 'Authentication service error',
      priority: 'medium',
      status: 'resolved',
      assignee: 'Michael Fernando',
      createdAt: 'Oct 07, 2026',
    },
    {
      id: 'INC-00121',
      title: 'Server CPU usage high',
      priority: 'low',
      status: 'closed',
      assignee: 'David Perera',
      createdAt: 'Oct 07, 2026',
    },
    {
      id: 'INC-00120',
      title: 'Payment gateway latency spike',
      priority: 'critical',
      status: 'investigating',
      assignee: 'Kamal Gunaratne',
      createdAt: 'Oct 06, 2026',
    },
    {
      id: 'INC-00119',
      title: 'Email notification service delayed',
      priority: 'medium',
      status: 'open',
      assignee: 'Nimali Jayawardena',
      createdAt: 'Oct 06, 2026',
    },
  ]);

  filteredIncidents = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    const priority = this.selectedPriority().toLowerCase().trim();
    const status = this.selectedStatus().toLowerCase().trim();

    return this.incidents().filter((incident) => {
      const matchesPriority = !priority || incident.priority.toLowerCase() === priority;
      const matchesStatus = !status || incident.status.toLowerCase() === status;
      const matchesSearch =
        !search ||
        incident.title.toLowerCase().includes(search) ||
        incident.id.toLowerCase().includes(search) ||
        incident.assignee.toLowerCase().includes(search);

      return matchesPriority && matchesStatus && matchesSearch;
    });
  });

  getPriorityLabel(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'critical':
        return 'Critical';
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return priority;
    }
  }

  getStatusLabel(status: string): string {
    switch (status.toLowerCase()) {
      case 'open':
        return 'Open';
      case 'investigating':
        return 'Investigating';
      case 'resolved':
        return 'Resolved';
      case 'closed':
        return 'Closed';
      default:
        return status;
    }
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedPriority.set('');
    this.selectedStatus.set('');
  }
}
