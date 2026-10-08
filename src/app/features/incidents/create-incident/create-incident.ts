import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-incident',
  imports: [RouterLink, FormsModule],
  templateUrl: './create-incident.html',
  styleUrl: './create-incident.css',
})
export class CreateIncident {
  private router = inject(Router);

  cancel(): void {
    this.router.navigate(['/incidents']);
  }

  onSubmit(): void {
    this.router.navigate(['/incidents']);
  }
}
