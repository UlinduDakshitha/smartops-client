import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);

  private readonly apiUrl = 'https://localhost:7001/api/dashboard';

  getSummary(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/summary`);
  }

  getIncidentsByPriority(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/incidents-by-priority`
    );
  }

  getSlaSummary(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/sla-summary`
    );
  }

  getTrends(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/trends`
    );
  }
}