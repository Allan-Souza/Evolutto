import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardService } from '../../../../core/services/reward.service';
import { RewardResponse } from '../../../../core/models/reward.model';
import { ToastService } from '../../../../core/services/toast.service';
import { UserStoreService } from '../../../../core/store/user-store.service';

@Component({
  selector: 'app-shop-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop-board.component.html',
  styleUrls: ['./shop-board.component.css']
})
export class ShopBoardComponent implements OnInit {
  rewards: RewardResponse[] = [];
  isLoading = true;
  userStore = inject(UserStoreService);
  private rewardService = inject(RewardService);
  private toastService = inject(ToastService);

  ngOnInit() {
    this.rewardService.getMyRewards().subscribe({
      next: (data) => {
        this.rewards = data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  onBuy(reward: RewardResponse) {
    if (this.userStore.currentCoins() < reward.cost) {
      this.toastService.show('Você não tem moedas suficientes! ⛔', 'danger');
      return;
    }

    this.rewardService.buyReward(reward.id).subscribe({
      next: () => {
        this.userStore.updateProgress(this.userStore.currentXp(), this.userStore.currentCoins() - reward.cost, this.userStore.debuffCounter());
        this.toastService.show('Item comprado com sucesso! O Guardião foi notificado. 🎁', 'success');
      },
      error: () => this.toastService.show('Erro ao processar compra.', 'danger')
    });
  }
}
