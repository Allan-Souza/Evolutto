import { RewardService } from '../../../../core/services/reward.service';
import { PurchaseResponse, RewardRequest } from '../../../../core/models/reward.model';
import { RewardFormModalComponent } from '../reward-form-modal/reward-form-modal.component';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParentalService, AdventurerSummaryResponse, HabitLogResponse } from '../../services/parental.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-parental-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RewardFormModalComponent],
  templateUrl: './parental-dashboard.component.html',
  styleUrls: ['./parental-dashboard.component.css']
})
export class ParentalDashboardComponent implements OnInit {
  adventurers: AdventurerSummaryResponse[] = [];
  adventurerLogs: { [id: string]: HabitLogResponse[] } = {};
  expandedAdventurer: string | null = null;
  isLoading = true;
  linkUsername = '';
  pendingPurchases: PurchaseResponse[] = [];
  showRewardModal = false;
  selectedAdvForReward = '';

  private parentalService = inject(ParentalService);
  private rewardService = inject(RewardService);
  private toastService = inject(ToastService);

  ngOnInit() {
    this.loadAdventurers();
    this.loadPendingPurchases();
  }

  loadAdventurers() {
    this.isLoading = true;
    this.parentalService.getMyAdventurers().subscribe({
      next: (data) => {
        this.adventurers = data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  
  loadPendingPurchases() {
    this.rewardService.getPendingPurchases().subscribe((data: PurchaseResponse[]) => this.pendingPurchases = data);
  }

  openRewardModal(advId: string) {
    this.selectedAdvForReward = advId;
    this.showRewardModal = true;
  }

  onSaveReward(request: any) {
    this.rewardService.createReward(request).subscribe({
      next: () => {
        this.toastService.show('Recompensa adicionada \u00E0 lojinha do Aventureiro!', 'success');
        this.showRewardModal = false;
      },
      error: () => this.toastService.show('Erro ao criar recompensa', 'danger')
    });
  }

  onDeliverReward(purchaseId: string) {
    this.rewardService.deliverReward(purchaseId).subscribe({
      next: () => {
        this.toastService.show('Pr\u00EAmio entregue com sucesso! \u2728', 'success');
        this.loadPendingPurchases();
      },
      error: () => this.toastService.show('Erro ao entregar pr\u00EAmio', 'danger')
    });
  }

  onLinkAdventurer() {
    if (!this.linkUsername.trim()) return;
    
    this.parentalService.linkAdventurer(this.linkUsername).subscribe({
      next: (data) => {
        this.adventurers.push(data);
        this.toastService.show(`Aventureiro ${data.username} vinculado!`, 'success');
        this.linkUsername = '';
      },
      error: () => {
        this.toastService.show('Erro ao vincular (UsuÃƒÂ¡rio nÃƒÂ£o encontrado)', 'danger');
      }
    });
  }

  onPardon(adventurerId: string) {
    this.parentalService.pardonDebuff(adventurerId).subscribe({
      next: () => {
        const adv = this.adventurers.find(a => a.id === adventurerId);
        if (adv) adv.debuffCounter = 0;
        this.toastService.show('Debuffs perdoados com sucesso!', 'success');
      },
      error: () => {
        this.toastService.show('Erro ao perdoar.', 'danger');
      }
    });
  }
  toggleLogs(adventurerId: string) {
    if (this.expandedAdventurer === adventurerId) {
      this.expandedAdventurer = null;
      return;
    }
    
    this.expandedAdventurer = adventurerId;
    if (!this.adventurerLogs[adventurerId]) {
      this.parentalService.getAdventurerLogs(adventurerId).subscribe({
        next: (logs) => {
          this.adventurerLogs[adventurerId] = logs;
        },
        error: () => {
          this.toastService.show('Erro ao carregar histórico.', 'danger');
        }
      });
    }
  }
  onReviewHabit(advId: string, logId: string, approved: boolean) {
    this.parentalService.reviewHabit(logId, approved).subscribe({
      next: () => {
        // Atualiza a lista otimisticamente
        const logs = this.adventurerLogs[advId];
        if (logs) {
          const targetLog = logs.find(l => l.id === logId);
          if (targetLog) {
            targetLog.status = approved ? 'COMPLETED' : 'REJECTED';
          }
        }
        
        // Se aprovou, forçamos um recarregamento dos dados do aventureiro para pegar o novo XP/Moedas
        if (approved) {
          this.loadAdventurers();
        }

        this.toastService.show(approved ? 'Hábito aprovado com sucesso! ✅' : 'Hábito rejeitado. ❌', approved ? 'success' : 'danger');
      },
      error: () => {
        this.toastService.show('Erro ao processar aprovação.', 'danger');
      }
    });
  }
}