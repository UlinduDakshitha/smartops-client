import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { IncidentList } from './features/incidents/incident-list/incident-list';
import { CreateIncident } from './features/incidents/create-incident/create-incident';
 import { IncidentDetails } from './features/incidents/incident-details/incident-details';
 import { TeamList } from './features/teams/team-list/team-list';

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
{ path: 'teams', component: TeamList },
    ],
  },
];