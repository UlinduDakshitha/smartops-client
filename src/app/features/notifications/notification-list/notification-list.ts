import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface AppNotification {
  id: number;
  title: string;
  message: string;
  type: 'Incident' | 'Assignment' | 'SLA' | 'System';
  time: string;
  read: boolean;
}

@Component({
  selector: 'app-notification-list',
  imports: [FormsModule],
  templateUrl: './notification-list.html',
  styleUrl: './notification-list.css',
})
export class NotificationList {
  notifications: AppNotification[] = [
    {
      id: 1,
      title: 'Critical Incident Reported',
      message: 'A database connection failure has been reported. Incident INC-00124 requires immediate attention.',
      type: 'Incident',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: 2,
      title: 'Incident Assigned to You',
      message: 'You have been assigned to investigate API response timeout INC-00123.',
      type: 'Assignment',
      time: '20 minutes ago',
      read: false,
    },
    {
      id: 3,
      title: 'SLA Breach Warning',
      message: 'Incident INC-00120 is approaching its resolution deadline.',
      type: 'SLA',
      time: '45 minutes ago',
      read: false,
    },
    {
      id: 4,
      title: 'Incident Resolved',
      message: 'Authentication service error INC-00122 has been marked as resolved.',
      type: 'Incident',
      time: '2 hours ago',
      read: true,
    },
    {
      id: 5,
      title: 'System Maintenance',
      message: 'Scheduled system maintenance is planned for this weekend.',
      type: 'System',
      time: '4 hours ago',
      read: true,
    },
    {
      id: 6,
      title: 'New Team Assignment',
      message: 'A new incident has been assigned to the DevOps Team.',
      type: 'Assignment',
      time: 'Yesterday',
      read: true,
    },
  ];

  selectedFilter = 'All';
  selectedType = 'All';

  get filteredNotifications(): AppNotification[] {
    return this.notifications.filter((notification) => {
      const matchesReadStatus =
        this.selectedFilter === 'All' ||
        (this.selectedFilter === 'Unread' && !notification.read) ||
        (this.selectedFilter === 'Read' && notification.read);

      const matchesType =
        this.selectedType === 'All' ||
        notification.type === this.selectedType;

      return matchesReadStatus && matchesType;
    });
  }

  get unreadCount(): number {
    return this.notifications.filter(
      (notification) => !notification.read,
    ).length;
  }

  get criticalCount(): number {
    return this.notifications.filter(
      (notification) =>
        notification.type === 'Incident' && !notification.read,
    ).length;
  }

  markAsRead(id: number): void {
    this.notifications = this.notifications.map((notification) =>
      notification.id === id
        ? { ...notification, read: true }
        : notification,
    );
  }

  markAllAsRead(): void {
    this.notifications = this.notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
  }

  deleteNotification(id: number): void {
    this.notifications = this.notifications.filter(
      (notification) => notification.id !== id,
    );
  }
}