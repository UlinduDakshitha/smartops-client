import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface SlaPolicy {
  id: number;
  name: string;
  description: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  responseTime: number;
  resolutionTime: number;
  active: boolean;
}

@Component({
  selector: 'app-sla-list',
  imports: [FormsModule],
  templateUrl: './sla-list.html',
  styleUrl: './sla-list.css',
})
export class SlaList {
  policies: SlaPolicy[] = [
    { id: 1, name: 'Critical Incident SLA', description: 'For critical production issues', priority: 'Critical', responseTime: 15, resolutionTime: 120, active: true },
    { id: 2, name: 'High Priority SLA', description: 'For major service disruptions', priority: 'High', responseTime: 30, resolutionTime: 240, active: true },
    { id: 3, name: 'Medium Priority SLA', description: 'For moderate incidents', priority: 'Medium', responseTime: 120, resolutionTime: 720, active: true },
    { id: 4, name: 'Low Priority SLA', description: 'For minor issues and requests', priority: 'Low', responseTime: 480, resolutionTime: 2880, active: true },
    { id: 5, name: 'Legacy Support SLA', description: 'Previous support agreement', priority: 'Low', responseTime: 720, resolutionTime: 4320, active: false },
  ];

  selectedPriority = '';
  selectedPolicy: SlaPolicy | null = null;
  showCreateForm = false;

  newPolicy = this.emptyPolicy();

  private emptyPolicy() {
    return {
      name: '',
      description: '',
      priority: 'Medium' as SlaPolicy['priority'],
      responseTime: 60,
      resolutionTime: 480,
      active: true,
    };
  }

  get filteredPolicies(): SlaPolicy[] {
    return this.policies.filter(
      (policy) =>
        !this.selectedPriority || policy.priority === this.selectedPriority,
    );
  }

  get activePolicies(): number {
    return this.policies.filter((policy) => policy.active).length;
  }

  openCreateForm(): void {
    this.selectedPolicy = null;
    this.newPolicy = this.emptyPolicy();
    this.showCreateForm = true;
  }

  viewPolicy(policy: SlaPolicy): void {
    this.showCreateForm = false;
    this.selectedPolicy = policy;
  }

  closeModal(): void {
    this.showCreateForm = false;
    this.selectedPolicy = null;
  }

  createPolicy(): void {
    const name = this.newPolicy.name.trim();
    const description = this.newPolicy.description.trim();

    if (
      !name ||
      !description ||
      this.newPolicy.responseTime < 1 ||
      this.newPolicy.resolutionTime < 1
    ) {
      return;
    }

    this.policies = [
      ...this.policies,
      {
        id: Math.max(0, ...this.policies.map((policy) => policy.id)) + 1,
        name,
        description,
        priority: this.newPolicy.priority,
        responseTime: this.newPolicy.responseTime,
        resolutionTime: this.newPolicy.resolutionTime,
        active: this.newPolicy.active,
      },
    ];

    this.closeModal();
  }
}