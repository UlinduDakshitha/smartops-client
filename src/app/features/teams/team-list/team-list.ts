import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../../../core/services/team.service';
import { Team } from '../../../core/models/team.model';

@Component({
  selector: 'app-team-list',
  imports: [FormsModule],
  templateUrl: './team-list.html',
  styleUrl: './team-list.css',
})
export class TeamList {
  private teamService = inject(TeamService);

  searchTerm = signal<string>('');
  teams = this.teamService.teams;

  // Create Team Modal State
  isCreateModalOpen = signal<boolean>(false);
  newTeamName = signal<string>('');
  newTeamDescription = signal<string>('');
  newTeamLead = signal<string>('');
  newTeamStatus = signal<'active' | 'inactive'>('active');

  // View Team Modal State
  isViewModalOpen = signal<boolean>(false);
  selectedTeam = signal<Team | null>(null);

  // Add Member State inside View Modal
  isAddMemberOpen = signal<boolean>(false);
  newMemberName = signal<string>('');
  newMemberRole = signal<string>('');
  newMemberEmail = signal<string>('');

  filteredTeams = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.teams();
    return this.teams().filter(
      (team) =>
        team.name.toLowerCase().includes(term) ||
        team.description.toLowerCase().includes(term) ||
        (team.lead && team.lead.toLowerCase().includes(term))
    );
  });

  totalTeamsCount = computed(() => this.teams().length);

  totalMembersCount = computed(() =>
    this.teams().reduce((acc, t) => acc + (t.membersCount || 0), 0)
  );

  activeTeamsCount = computed(
    () => this.teams().filter((t) => t.status === 'active').length
  );

  // Create Team Actions
  openCreateModal(): void {
    this.newTeamName.set('');
    this.newTeamDescription.set('');
    this.newTeamLead.set('');
    this.newTeamStatus.set('active');
    this.isCreateModalOpen.set(true);
  }

  closeCreateModal(): void {
    this.isCreateModalOpen.set(false);
  }

  saveNewTeam(): void {
    if (!this.newTeamName().trim()) return;

    this.teamService.createTeam({
      name: this.newTeamName().trim(),
      description: this.newTeamDescription().trim(),
      lead: this.newTeamLead().trim(),
      status: this.newTeamStatus(),
    });

    this.closeCreateModal();
  }

  // View Team Actions
  openViewModal(team: Team): void {
    this.selectedTeam.set(team);
    this.isAddMemberOpen.set(false);
    this.isViewModalOpen.set(true);
  }

  closeViewModal(): void {
    this.isViewModalOpen.set(false);
    this.selectedTeam.set(null);
  }

  toggleTeamStatus(team: Team): void {
    this.teamService.toggleTeamStatus(team.id);
    const updated = this.teams().find((t) => t.id === team.id) || null;
    this.selectedTeam.set(updated);
  }

  toggleAddMember(): void {
    this.isAddMemberOpen.update((open) => !open);
    this.newMemberName.set('');
    this.newMemberRole.set('');
    this.newMemberEmail.set('');
  }

  saveMember(): void {
    const currentTeam = this.selectedTeam();
    if (!currentTeam || !this.newMemberName().trim()) return;

    this.teamService.addMemberToTeam(currentTeam.id, {
      name: this.newMemberName().trim(),
      role: this.newMemberRole().trim() || 'Team Member',
      email: this.newMemberEmail().trim(),
    });

    // Refresh selected team reference
    const updated = this.teams().find((t) => t.id === currentTeam.id) || null;
    this.selectedTeam.set(updated);

    this.isAddMemberOpen.set(false);
    this.newMemberName.set('');
    this.newMemberRole.set('');
    this.newMemberEmail.set('');
  }
}
