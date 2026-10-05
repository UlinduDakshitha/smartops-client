import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  private dashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {

    this.dashboardService.getSummary().subscribe({
      next: (data) => {
        console.log('Dashboard Summary:', data);
      },

      error: (error) => {
        console.error('Dashboard API Error:', error);
      }
    });

  }
}