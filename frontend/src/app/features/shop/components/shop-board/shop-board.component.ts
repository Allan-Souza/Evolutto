import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../services/shop.service';
import { UserStoreService } from '../../../../core/store/user-store.service';
import { CreateRewardRequest, RewardItem, ShopResponse, ShopStatus } from '../../../../core/models/shop.model';
import { RewardCardComponent } from '../reward-card/reward-card.component';
import { ToastService } from '../../../../core/services/toast.service';
import { RewardFormModalComponent } from '../reward-form-modal/reward-form-modal.component';
import { NgIconComponent } from '@ng-icons/core';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-shop-board',
  standalone: true,
  imports: [CommonModule, RewardCardComponent, RewardFormModalComponent, NgIconComponent, ConfirmModalComponent],
  templateUrl: './shop-board.component.html',
  styleUrls: ['./shop-board.component.css']
})
export class ShopBoardComponent implements OnInit {
  shopData: ShopResponse | null = null;
  rewards: RewardItem[] = [];
  status: ShopStatus = ShopStatus.ACTIVE;
  loadingId: string | null = null;
  showModal = false;
  isLoading = true;
  rewardToEdit: RewardItem | null = null;
  showConfirmModal = false;
  itemToDelete: string | null = null;
  
  private shopService = inject(ShopService);
  private toastService = inject(ToastService);
  public userStore = inject(UserStoreService);
  public ShopStatus = ShopStatus;

  ngOnInit(): void {
    this.shopService.getShop().subscribe(data => {
      this.status = data.status;
      this.rewards = data.availableRewards;
    });
  }

  onBuy(rewardId: string) {
    this.loadingId = rewardId;
    this.shopService.buyReward(rewardId, this.userStore.currentCoins()).subscribe({
      next: (res) => {
        if (res.success) {
          this.userStore.spendCoins(this.userStore.currentCoins() - res.newCoinBalance);
        } else {
          alert(res.message);
        }
        this.loadingId = null;
      },
      error: () => this.loadingId = null
    });
  }

  openModal(reward?: RewardItem) {
    if (reward) {
      this.rewardToEdit = reward;
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.rewardToEdit = null;
  }

  onSaveReward(request: CreateRewardRequest) {
    if (this.rewardToEdit) {
      this.shopService.updateReward(this.rewardToEdit.id, request).subscribe(updatedReward => {
        const index = this.rewards.findIndex(r => r.id === updatedReward.id);
        if (index !== -1) {
          this.rewards[index] = updatedReward;
        }
        this.closeModal();
        this.toastService.show('Recompensa atualizada!', 'info');
      });
    } else {
      this.shopService.createReward(request).subscribe(newReward => {
        this.rewards = [...this.rewards, newReward];
        this.closeModal();
        this.toastService.show('Recompensa criada!', 'success');
      });
    }
  }

  onDeleteReward(id: string) {
    this.itemToDelete = id;
    this.showConfirmModal = true;
  }

  onConfirmDelete() {
    if (this.itemToDelete) {
      this.shopService.deleteReward(this.itemToDelete).subscribe(() => {
        this.rewards = this.rewards.filter(r => r.id !== this.itemToDelete);
        this.toastService.show('Recompensa excluída.', 'warning');
        this.showConfirmModal = false;
        this.itemToDelete = null;
      });
    }
  }

  onCancelDelete() {
    this.showConfirmModal = false;
    this.itemToDelete = null;
  }
}
