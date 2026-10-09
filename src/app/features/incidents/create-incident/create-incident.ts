import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IncidentService } from '../../../core/services/incident.service';
import { IncidentPriority } from '../../../core/models/incident.model';

@Component({
  selector: 'app-create-incident',
  imports: [FormsModule],
  templateUrl: './create-incident.html',
  styleUrl: './create-incident.css',
})
export class CreateIncident {
  private router = inject(Router);
  private incidentService = inject(IncidentService);

  title = signal<string>('');
  priority = signal<IncidentPriority>('medium');
  category = signal<string>('application');
  description = signal<string>('');
  team = signal<string>('support');
  assignee = signal<string>('john');

  cancel(): void {
    this.router.navigate(['/incidents']);
  }

  onSubmit(): void {
    if (!this.title().trim()) {
      return;
    }

    const teamNames: Record<string, string> = {
      support: 'Support Team',
      devops: 'DevOps Team',
      security: 'Security Team',
    };

    const assigneeNames: Record<string, string> = {
      john: 'John Silva',
      sarah: 'Sarah Perera',
      michael: 'Michael Fernando',
    };

    const newIncident = this.incidentService.createIncident({
      title: this.title().trim(),
      priority: this.priority(),
      category: this.category().charAt(0).toUpperCase() + this.category().slice(1),
      description: this.description().trim(),
      assignedTeam: teamNames[this.team()] || this.team(),
      assignee: assigneeNames[this.assignee()] || this.assignee(),
    });

    this.router.navigate(['/incidents', newIncident.id]);
  }
}
