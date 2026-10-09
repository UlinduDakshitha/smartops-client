import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IncidentService } from '../../../core/services/incident.service';
import { Incident, IncidentPriority, IncidentStatus } from '../../../core/models/incident.model';

@Component({
  selector: 'app-incident-details',
  imports: [RouterLink, FormsModule],
  templateUrl: './incident-details.html',
  styleUrl: './incident-details.css',
})
export class IncidentDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private incidentService = inject(IncidentService);

  incidentId = signal<string>('INC-00124');

  incident = computed<Incident | undefined>(() => {
    const id = this.incidentId();
    return this.incidentService.getIncidentById(id) || this.incidentService.incidents()[0];
  });

  // Edit Modal State
  isEditModalOpen = signal<boolean>(false);
  editTitle = signal<string>('');
  editDescription = signal<string>('');
  editPriority = signal<IncidentPriority>('critical');
  editCategory = signal<string>('Database');
  editAssignedTeam = signal<string>('DevOps Team');
  editAssignee = signal<string>('John Silva');

  // Status Modal State
  isStatusModalOpen = signal<boolean>(false);
  selectedNewStatus = signal<IncidentStatus>('open');
  statusNote = signal<string>('');

  // Comment Form State
  newCommentText = signal<string>('');

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.incidentId.set(id);
      }
    });
  }

  goBack(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate(['/incidents']);
  }

  openEditModal(): void {
    const current = this.incident();
    if (current) {
      this.editTitle.set(current.title);
      this.editDescription.set(current.description || '');
      this.editPriority.set(current.priority);
      this.editCategory.set(current.category || 'Database');
      this.editAssignedTeam.set(current.assignedTeam || 'DevOps Team');
      this.editAssignee.set(current.assignee || '');
    }
    this.isEditModalOpen.set(true);
  }

  closeEditModal(): void {
    this.isEditModalOpen.set(false);
  }

  saveEdit(): void {
    const current = this.incident();
    if (!current) return;

    this.incidentService.updateIncident(current.id, {
      title: this.editTitle().trim() || current.title,
      description: this.editDescription().trim(),
      priority: this.editPriority(),
      category: this.editCategory(),
      assignedTeam: this.editAssignedTeam(),
      assignee: this.editAssignee().trim() || 'Unassigned',
    });

    this.closeEditModal();
  }

  openStatusModal(): void {
    const current = this.incident();
    if (current) {
      this.selectedNewStatus.set(current.status);
    }
    this.statusNote.set('');
    this.isStatusModalOpen.set(true);
  }

  closeStatusModal(): void {
    this.isStatusModalOpen.set(false);
  }

  saveStatus(): void {
    const current = this.incident();
    if (!current) return;

    this.incidentService.updateStatus(
      current.id,
      this.selectedNewStatus(),
      this.statusNote().trim()
    );

    this.closeStatusModal();
  }

  addComment(): void {
    const current = this.incident();
    const comment = this.newCommentText().trim();
    if (!current || !comment) return;

    this.incidentService.addComment(current.id, comment, 'Ulindu');
    this.newCommentText.set('');
  }

  getPriorityLabel(priority?: string): string {
    if (!priority) return '';
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

  getStatusLabel(status?: string): string {
    if (!status) return '';
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
}
