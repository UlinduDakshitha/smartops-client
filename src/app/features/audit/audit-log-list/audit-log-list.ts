import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface AuditLog {
  id: number;
  userName: string;
  userEmail: string;
  action: 'Login' | 'Create' | 'Update' | 'Delete';
  entity: string;
  details: string;
  ipAddress: string;
  status: 'Success' | 'Failed';
  timestamp: string;
}

@Component({
  selector: 'app-audit-log-list',
  imports: [FormsModule],
  templateUrl: './audit-log-list.html',
  styleUrl: './audit-log-list.css',
})
export class AuditLogList {
  searchTerm = signal<string>('');
  selectedAction = signal<string>('');
  selectedStatus = signal<string>('');

  logs = signal<AuditLog[]>([
    {
      id: 1,
      userName: 'Ulindu Bandara',
      userEmail: 'ulindu@smartops.com',
      action: 'Login',
      entity: 'Authentication',
      details: 'User logged into the system.',
      ipAddress: '192.168.1.10',
      status: 'Success',
      timestamp: 'Oct 10, 2026\n09:42 AM',
    },
    {
      id: 2,
      userName: 'John Silva',
      userEmail: 'john@smartops.com',
      action: 'Create',
      entity: 'Incident',
      details: 'Created incident INC-00125.',
      ipAddress: '192.168.1.12',
      status: 'Success',
      timestamp: 'Oct 10, 2026\n09:30 AM',
    },
    {
      id: 3,
      userName: 'Sarah Perera',
      userEmail: 'sarah@smartops.com',
      action: 'Update',
      entity: 'Incident',
      details: 'Updated incident priority to Critical.',
      ipAddress: '192.168.1.15',
      status: 'Success',
      timestamp: 'Oct 10, 2026\n09:15 AM',
    },
    {
      id: 4,
      userName: 'Michael Fernando',
      userEmail: 'michael@smartops.com',
      action: 'Delete',
      entity: 'User',
      details: 'Attempted to delete a user account.',
      ipAddress: '192.168.1.20',
      status: 'Failed',
      timestamp: 'Oct 10, 2026\n08:55 AM',
    },
    {
      id: 5,
      userName: 'David Perera',
      userEmail: 'david@smartops.com',
      action: 'Update',
      entity: 'SLA Policy',
      details: 'Updated the High Priority SLA policy.',
      ipAddress: '192.168.1.18',
      status: 'Success',
      timestamp: 'Oct 10, 2026\n08:40 AM',
    },
  ]);

  filteredLogs = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    const action = this.selectedAction();
    const status = this.selectedStatus();

    return this.logs().filter((log) => {
      const matchesSearch =
        !search ||
        log.userName.toLowerCase().includes(search) ||
        log.userEmail.toLowerCase().includes(search) ||
        log.details.toLowerCase().includes(search) ||
        log.entity.toLowerCase().includes(search);

      const matchesAction = !action || log.action === action;
      const matchesStatus = !status || log.status === status;

      return matchesSearch && matchesAction && matchesStatus;
    });
  });
}