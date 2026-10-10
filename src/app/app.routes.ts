import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { IncidentList } from './features/incidents/incident-list/incident-list';
import { CreateIncident } from './features/incidents/create-incident/create-incident';
import { IncidentDetails } from './features/incidents/incident-details/incident-details';
import { TeamList } from './features/teams/team-list/team-list';
import { UserList } from './features/users/user-list/user-list';
import { SlaList } from './features/sla/sla-list/sla-list';
import { NotificationList } from './features/notifications/notification-list/notification-list';
import { AuditLogList } from './features/audit/audit-log-list/audit-log-list';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'incidents/create',
        component: CreateIncident,
      },
      {
        path: 'incidents/:id',
        component: IncidentDetails,
      },
      {
        path: 'incidents',
        component: IncidentList,
      },
      {
        path: 'teams',
        component: TeamList,
      },
      {
        path: 'users',
        component: UserList,
      },

      { path: 'sla', component: SlaList },

      { path: 'notifications', component: NotificationList },
      { path: 'audit', component: AuditLogList },
    ],
  },
];