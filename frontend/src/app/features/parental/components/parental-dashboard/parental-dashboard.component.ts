import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentalService } from '../../services/parental.service';
import { PendingApproval } from '../../../../core/models/parental.model';

@Component({
  selector: 'app-parental-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parental-dashboard.component.html',
  styleUrls: ['./parental-dashboard.component.css']
})
export class ParentalDashboardComponent implements OnInit {
  approvals: PendingApproval[] = [];
  isLoading = true;
  isShopFrozen = true; // Simulating that the shop is frozen due to a debuff

  private parentalService = inject(ParentalService);

  ngOnInit() {
    this.loadApprovals();
  }

  loadApprovals() {
    this.isLoading = true;
    this.parentalService.getPendingApprovals().subscribe({
      next: (data) => {
        this.approvals = data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  handleApproval(habitId: string, approved: boolean) {
    // Optimistic UI update
    this.approvals = this.approvals.filter(a => a.habitId !== habitId);
    
    this.parentalService.approveHabit({
      habitId,
      childId: 'c1',
      approved
    }).subscribe();
  }

  unfreezeShop() {
    this.isShopFrozen = false;
    alert("A Lojinha de Alex foi descongelada com sucesso!");
  }
}
