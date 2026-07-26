import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../services/shop.service';
import { UserStoreService } from '../../../../core/store/user-store.service';
import { RewardItem, ShopStatus } from '../../../../core/models/shop.model';
import { RewardCardComponent } from '../reward-card/reward-card.component';

@Component({
  selector: 'app-shop-board',
  standalone: true,
  imports: [CommonModule, RewardCardComponent],
  templateUrl: './shop-board.component.html',
  styleUrls: ['./shop-board.component.css']
})
export class ShopBoardComponent implements OnInit {
  rewards: RewardItem[] = [];
  status: ShopStatus = ShopStatus.ACTIVE;
  loadingId: string | null = null;
  
  private shopService = inject(ShopService);
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
}
