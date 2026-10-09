import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IncidentService } from '../../../core/services/incident.service';

@Component({
  selector: 'app-incident-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './incident-list.html',
  styleUrl: './incident-list.css',
})
export class IncidentList {
  private incidentService = inject(IncidentService);

  searchTerm = signal<string>('');
  selectedPriority = signal<string>('');
  selectedStatus = signal<string>('');

  incidents = this.incidentService.incidents;


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
