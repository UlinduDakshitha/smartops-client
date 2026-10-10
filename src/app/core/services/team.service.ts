import { Injectable, signal } from '@angular/core';
import { Team, TeamMember } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private initialTeams: Team[] = [
    {
      id: 'team-1',
      name: 'DevOps Team',
      avatar: 'D',
      status: 'active',
      description: 'Infrastructure, deployments and server operations.',
      lead: 'Kasun Bandara',
      membersCount: 5,
      members: [
        { id: 'm1', name: 'Kasun Bandara', role: 'Team Lead / SRE', email: 'kasun@smartops.com', avatar: 'K' },
        { id: 'm2', name: 'Dinesh Perera', role: 'DevOps Engineer', email: 'dinesh@smartops.com', avatar: 'D' },
        { id: 'm3', name: 'Chaminda Silva', role: 'Cloud Architect', email: 'chaminda@smartops.com', avatar: 'C' },
        { id: 'm4', name: 'Nuwan Fernando', role: 'CI/CD Specialist', email: 'nuwan@smartops.com', avatar: 'N' },
        { id: 'm5', name: 'Lahiru Mendis', role: 'Infrastructure Engineer', email: 'lahiru@smartops.com', avatar: 'L' },
      ],
    },
    {
      id: 'team-2',
      name: 'Backend Team',
      avatar: 'B',
      status: 'active',
      description: 'APIs, databases and backend services.',
      lead: 'Amila Jayasinghe',
      membersCount: 6,
      members: [
        { id: 'm6', name: 'Amila Jayasinghe', role: 'Lead Architect', email: 'amila@smartops.com', avatar: 'A' },
        { id: 'm7', name: 'Sarah Perera', role: 'Senior .NET Developer', email: 'sarah@smartops.com', avatar: 'S' },
        { id: 'm8', name: 'Roshan Wickramasinghe', role: 'Database Admin', email: 'roshan@smartops.com', avatar: 'R' },
        { id: 'm9', name: 'Dineth De Silva', role: 'API Developer', email: 'dineth@smartops.com', avatar: 'D' },
        { id: 'm10', name: 'Chathura Alwis', role: 'Backend Engineer', email: 'chathura@smartops.com', avatar: 'C' },
        { id: 'm11', name: 'Kavindu Senanayake', role: 'Microservices Dev', email: 'kavindu@smartops.com', avatar: 'K' },
      ],
    },
    {
      id: 'team-3',
      name: 'Frontend Team',
      avatar: 'F',
      status: 'active',
      description: 'User interfaces and frontend application issues.',
      lead: 'Sachini Gamage',
      membersCount: 4,
      members: [
        { id: 'm12', name: 'Sachini Gamage', role: 'Lead UI/UX Developer', email: 'sachini@smartops.com', avatar: 'S' },
        { id: 'm13', name: 'Nilanka Perera', role: 'Angular Engineer', email: 'nilanka@smartops.com', avatar: 'N' },
        { id: 'm14', name: 'Anuki Fonseka', role: 'Frontend Developer', email: 'anuki@smartops.com', avatar: 'A' },
        { id: 'm15', name: 'Dilshan Rathnayake', role: 'UI Engineer', email: 'dilshan@smartops.com', avatar: 'D' },
      ],
    },
    {
      id: 'team-4',
      name: 'Network Team',
      avatar: 'N',
      status: 'active',
      description: 'Network connectivity and infrastructure support.',
      lead: 'Pradeep Samarasinghe',
      membersCount: 3,
      members: [
        { id: 'm16', name: 'Pradeep Samarasinghe', role: 'Lead Network Engineer', email: 'pradeep@smartops.com', avatar: 'P' },
        { id: 'm17', name: 'Harsha Priyadarshana', role: 'Network Security', email: 'harsha@smartops.com', avatar: 'H' },
        { id: 'm18', name: 'Ruwan Kumara', role: 'Telecom & Hardware', email: 'ruwan@smartops.com', avatar: 'R' },
      ],
    },
    {
      id: 'team-5',
      name: 'Security Team',
      avatar: 'S',
      status: 'active',
      description: 'Security incidents, access and vulnerability management.',
      lead: 'Michael Fernando',
      membersCount: 4,
      members: [
        { id: 'm19', name: 'Michael Fernando', role: 'SecOps Lead', email: 'michael@smartops.com', avatar: 'M' },
        { id: 'm20', name: 'Gayani Dissanayake', role: 'Security Analyst', email: 'gayani@smartops.com', avatar: 'G' },
        { id: 'm21', name: 'Tharindu Rajapaksha', role: 'Vulnerability Specialist', email: 'tharindu@smartops.com', avatar: 'T' },
        { id: 'm22', name: 'Janith Wickrama', role: 'IAM Administrator', email: 'janith@smartops.com', avatar: 'J' },
      ],
    },
    {
      id: 'team-6',
      name: 'Help Desk',
      avatar: 'H',
      status: 'inactive',
      description: 'General IT support and user assistance.',
      lead: 'Sanduni Cooray',
      membersCount: 2,
      members: [
        { id: 'm23', name: 'Sanduni Cooray', role: 'Help Desk Supervisor', email: 'sanduni@smartops.com', avatar: 'S' },
        { id: 'm24', name: 'Isuru Samaraweera', role: 'IT Support Specialist', email: 'isuru@smartops.com', avatar: 'I' },
      ],
    },
  ];

  teams = signal<Team[]>(this.initialTeams);

  createTeam(teamData: {
    name: string;
    description: string;
    lead?: string;
    status: 'active' | 'inactive';
  }): Team {
    const avatar = teamData.name.trim().charAt(0).toUpperCase() || 'T';
    const id = `team-${Date.now()}`;
    const leadName = teamData.lead?.trim() || 'Unassigned';
    const initialMembers: TeamMember[] = teamData.lead?.trim()
      ? [
          {
            id: `m-${Date.now()}`,
            name: leadName,
            role: 'Team Lead',
            email: `${leadName.toLowerCase().replace(/\s+/g, '.')}@smartops.com`,
            avatar: leadName.charAt(0).toUpperCase(),
          },
        ]
      : [];

    const newTeam: Team = {
      id,
      name: teamData.name.trim(),
      avatar,
      description: teamData.description.trim(),
      status: teamData.status,
      lead: leadName,
      membersCount: initialMembers.length,
      members: initialMembers,
    };

    this.teams.update((prev) => [newTeam, ...prev]);
    return newTeam;
  }

  addMemberToTeam(teamId: string, member: { name: string; role: string; email: string }): void {
    const avatar = member.name.trim().charAt(0).toUpperCase() || 'M';
    const newMember: TeamMember = {
      id: `m-${Date.now()}`,
      name: member.name.trim(),
      role: member.role.trim() || 'Team Member',
      email: member.email.trim() || `${member.name.toLowerCase().replace(/\s+/g, '.')}@smartops.com`,
      avatar,
    };

    this.teams.update((prev) =>
      prev.map((team) => {
        if (team.id === teamId) {
          const members = team.members ? [...team.members, newMember] : [newMember];
          return {
            ...team,
            members,
            membersCount: members.length,
          };
        }
        return team;
      })
    );
  }

  toggleTeamStatus(teamId: string): void {
    this.teams.update((prev) =>
      prev.map((team) => {
        if (team.id === teamId) {
          return {
            ...team,
            status: team.status === 'active' ? 'inactive' : 'active',
          };
        }
        return team;
      })
    );
  }

  deleteTeam(teamId: string): void {
    this.teams.update((prev) => prev.filter((t) => t.id !== teamId));
  }
}
