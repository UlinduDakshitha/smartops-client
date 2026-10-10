import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface AppUser {
  id: number;
  name: string;
  email: string;
  role: string;
  team: string;
  status: 'Active' | 'Inactive';
  joinedDate: string;
}

@Component({
  selector: 'app-user-list',
  imports: [FormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  users: AppUser[] = [
    {
      id: 1,
      name: 'Ulindu Bandara',
      email: 'ulindu@smartops.com',
      role: 'Administrator',
      team: 'DevOps Team',
      status: 'Active',
      joinedDate: 'Oct 01, 2026',
    },
    {
      id: 2,
      name: 'John Silva',
      email: 'john@smartops.com',
      role: 'Engineer',
      team: 'DevOps Team',
      status: 'Active',
      joinedDate: 'Oct 02, 2026',
    },
    {
      id: 3,
      name: 'Sarah Perera',
      email: 'sarah@smartops.com',
      role: 'Engineer',
      team: 'Backend Team',
      status: 'Active',
      joinedDate: 'Oct 03, 2026',
    },
    {
      id: 4,
      name: 'Michael Fernando',
      email: 'michael@smartops.com',
      role: 'Technician',
      team: 'Network Team',
      status: 'Inactive',
      joinedDate: 'Oct 04, 2026',
    },
    {
      id: 5,
      name: 'David Perera',
      email: 'david@smartops.com',
      role: 'Technician',
      team: 'Help Desk',
      status: 'Active',
      joinedDate: 'Oct 05, 2026',
    },
  ];

  searchTerm = '';
  selectedRole = '';
  selectedStatus = '';

  showAddForm = false;
  selectedUser: AppUser | null = null;

  newUser = this.emptyUser();

  private emptyUser() {
    return {
      name: '',
      email: '',
      role: 'Engineer',
      team: 'DevOps Team',
      status: 'Active' as 'Active' | 'Inactive',
    };
  }

  get filteredUsers(): AppUser[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.users.filter((user) => {
      const matchesSearch =
        !term ||
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term);

      const matchesRole =
        !this.selectedRole || user.role === this.selectedRole;

      const matchesStatus =
        !this.selectedStatus || user.status === this.selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }

  get activeUsers(): number {
    return this.users.filter((user) => user.status === 'Active').length;
  }

  get administrators(): number {
    return this.users.filter((user) => user.role === 'Administrator').length;
  }

  openAddForm(): void {
    this.selectedUser = null;
    this.newUser = this.emptyUser();
    this.showAddForm = true;
  }

  viewUser(user: AppUser): void {
    this.showAddForm = false;
    this.selectedUser = user;
  }

  closeModal(): void {
    this.showAddForm = false;
    this.selectedUser = null;
  }

  addUser(): void {
    const name = this.newUser.name.trim();
    const email = this.newUser.email.trim().toLowerCase();

    if (!name || !email || !email.includes('@')) {
      return;
    }

    if (this.users.some((user) => user.email.toLowerCase() === email)) {
      return;
    }

    const nextId = Math.max(0, ...this.users.map((user) => user.id)) + 1;

    this.users = [
      ...this.users,
      {
        id: nextId,
        name,
        email,
        role: this.newUser.role,
        team: this.newUser.team,
        status: this.newUser.status,
        joinedDate: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }),
      },
    ];

    this.closeModal();
  }
}