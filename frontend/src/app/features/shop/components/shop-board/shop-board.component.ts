import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../services/shop.service';
import { UserStoreService } from '../../../../core/store/user-store.service';
import { CreateRewardRequest, RewardItem, ShopResponse, ShopStatus } from '../../../../core/models/shop.model';
import { RewardCardComponent } from '../reward-card/reward-card.component';
import { ToastService } from '../../../../core/services/toast.service';
import { RewardFormModalComponent } from '../reward-form-modal/reward-form-modal.component';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-shop-board',
  standalone: true,
  imports: [CommonModule, RewardCardComponent, RewardFormModalComponent, NgIconComponent],
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

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSaveReward(request: CreateRewardRequest) {
    this.shopService.createReward(request).subscribe(newReward => {
      this.rewards = [...this.rewards, newReward];
      this.closeModal();
      this.toastService.show('Recompensa criada com sucesso!', 'success');
    });
  }
}
