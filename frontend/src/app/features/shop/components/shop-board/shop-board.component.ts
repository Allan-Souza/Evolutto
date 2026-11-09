import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';
import { RewardService } from '../../../../core/services/reward.service';
import { RewardRequest, RewardResponse } from '../../../../core/models/reward.model';
import { ToastService } from '../../../../core/services/toast.service';
import { UserStoreService } from '../../../../core/store/user-store.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { RewardFormModalComponent } from '../reward-form-modal/reward-form-modal.component';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-shop-board',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RewardFormModalComponent, ConfirmModalComponent],
  templateUrl: './shop-board.component.html',
  styleUrls: ['./shop-board.component.css']
})
export class ShopBoardComponent implements OnInit {
  rewards: RewardResponse[] = [];
  isLoading = true;
  showModal = false;
  rewardToEdit: RewardResponse | null = null;
  showConfirmModal = false;
  itemToDelete: string | null = null;

  userStore = inject(UserStoreService);
  authService = inject(AuthService);
  private rewardService = inject(RewardService);
  private toastService = inject(ToastService);

  get isSolo(): boolean {
    return this.authService.hasRole('SOLO');
  }

  ngOnInit() {
    this.loadRewards();
  }

  loadRewards() {
    this.isLoading = true;
    this.rewardService.getMyRewards().subscribe({
      next: (data) => {
        this.rewards = data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  openModal(reward?: RewardResponse) {
    this.rewardToEdit = reward ?? null;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.rewardToEdit = null;
  }

  onSaveReward(request: RewardRequest) {
    if (this.rewardToEdit) {
      this.rewardService.updateReward(this.rewardToEdit.id, request).subscribe({
        next: (updated) => {
          const index = this.rewards.findIndex(r => r.id === updated.id);
          if (index !== -1) {
            this.rewards[index] = updated;
          }
          this.closeModal();
          this.toastService.show('Recompensa atualizada com sucesso!', 'info');
        },
        error: () => this.toastService.show('Erro ao atualizar recompensa.', 'danger')
      });
    } else {
      this.rewardService.createReward(request).subscribe({
        next: (created) => {
          this.rewards = [...this.rewards, created];
          this.closeModal();
          this.toastService.show('Recompensa adicionada à sua lojinha! 🎁', 'success');
        },
        error: () => this.toastService.show('Erro ao criar recompensa.', 'danger')
      });
    }
  }

  onDeleteReward(rewardId: string) {
    this.itemToDelete = rewardId;
    this.showConfirmModal = true;
  }

  onConfirmDelete() {
    if (!this.itemToDelete) return;
    const id = this.itemToDelete;
    this.rewardService.deleteReward(id).subscribe({
      next: () => {
        this.rewards = this.rewards.filter(r => r.id !== id);
        this.toastService.show('Recompensa removida da lojinha.', 'warning');
        this.showConfirmModal = false;
        this.itemToDelete = null;
      },
      error: () => {
        this.toastService.show('Erro ao excluir recompensa.', 'danger');
        this.showConfirmModal = false;
        this.itemToDelete = null;
      }
    });
  }

  onCancelDelete() {
    this.showConfirmModal = false;
    this.itemToDelete = null;
  }

  onBuy(reward: RewardResponse) {
    if (this.userStore.currentCoins() < reward.cost) {
      this.toastService.show('Você não tem moedas suficientes! ⛔', 'danger');
      return;
    }

    this.rewardService.buyReward(reward.id).subscribe({
      next: () => {
        this.userStore.updateProgress(this.userStore.currentXp(), this.userStore.currentCoins() - reward.cost, this.userStore.debuffCounter());
        if (this.isSolo) {
          this.toastService.show('Recompensa resgatada com sucesso! Aproveite seu prêmio! 🎁', 'success');
        } else {
          this.toastService.show('Item comprado com sucesso! O Guardião foi notificado. 🎁', 'success');
        }
      },
      error: () => this.toastService.show('Erro ao processar compra.', 'danger')
    });
  }
}
