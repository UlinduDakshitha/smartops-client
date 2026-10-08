import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { IncidentList } from './features/incidents/incident-list/incident-list';
import { CreateIncident } from './features/incidents/create-incident/create-incident';


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
        path: 'incidents',
        component: IncidentList,
      },
      {
        path: 'incidents/create',
        component: CreateIncident,
      },
    ],
  },
];