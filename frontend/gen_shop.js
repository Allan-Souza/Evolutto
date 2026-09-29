const fs = require('fs');
const path = require('path');

const boardDir = 'src/app/features/shop/components/shop-board';

const tsContent = `import { Component, OnInit, inject } from '@angular/core';
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
    if (this.userStore.coins() < reward.cost) {
      this.toastService.show('Voc\u00EA n\u00E3o tem moedas suficientes! \u26D4', 'danger');
      return;
    }

    this.rewardService.buyReward(reward.id).subscribe({
      next: () => {
        this.userStore.updateProgress(this.userStore.xp(), this.userStore.coins() - reward.cost, this.userStore.debuffs());
        this.toastService.show('Item comprado com sucesso! O Guardi\u00E3o foi notificado. \uD83C\uDF81', 'success');
      },
      error: () => this.toastService.show('Erro ao processar compra.', 'danger')
    });
  }
}
`;

const htmlContent = `<div class="shop-container">
  <div class="shop-header">
    <h2 style="font-size: 2rem; margin-bottom: 0;">Lojinha de Recompensas \uD83C\uDFEA</h2>
    <p style="color: rgba(255,255,255,0.7); margin-top: 0.5rem;">Gaste suas moedas conquistadas e resgate pr\u00EAmios na vida real!</p>
  </div>

  <div *ngIf="isLoading" class="loading-state glass-panel">
    Carregando pr\u00EAmios... \u23F3
  </div>

  <div *ngIf="!isLoading && rewards.length === 0" class="empty-state glass-panel" style="text-align: center; padding: 3rem;">
    <h3 style="margin-bottom: 0.5rem;">Sua lojinha est\u00E1 vazia \uD83D\uDE22</h3>
    <p style="color: rgba(255,255,255,0.7);">Pe\u00E7a ao seu Guardi\u00E3o para adicionar pr\u00EAmios aqui!</p>
  </div>

  <div class="rewards-grid" *ngIf="!isLoading && rewards.length > 0">
    <div class="reward-card glass-panel animate-slide-up" *ngFor="let reward of rewards">
      <div class="card-icon" style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">
        \uD83C\uDF81
      </div>
      <h3 style="margin: 0 0 0.5rem 0; text-align: center;">{{ reward.title }}</h3>
      <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; text-align: center; margin-bottom: 1.5rem;">
        {{ reward.description || 'Sem descri\u00E7\u00E3o' }}
      </p>
      
      <div class="buy-section" style="display: flex; flex-direction: column; gap: 0.8rem; margin-top: auto;">
        <div class="cost-badge" style="background: rgba(255,165,0,0.2); color: #ffa500; font-weight: bold; text-align: center; padding: 0.5rem; border-radius: 8px; font-size: 1.1rem;">
          {{ reward.cost }} \uD83E\uDE99
        </div>
        <button class="btn-primary" 
                [disabled]="userStore.coins() < reward.cost"
                (click)="onBuy(reward)"
                style="width: 100%; font-weight: bold;">
          {{ userStore.coins() >= reward.cost ? 'Comprar' : 'Faltam Moedas' }}
        </button>
      </div>
    </div>
  </div>
</div>
`;

const cssContent = `.shop-container { padding: 1rem; max-width: 1000px; margin: 0 auto; }
.rewards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
.reward-card { display: flex; flex-direction: column; padding: 1.5rem; border-top: 2px solid #ffa500; transition: transform 0.2s ease; }
.reward-card:hover { transform: translateY(-5px); }
`;

fs.writeFileSync(path.join(boardDir, 'shop-board.component.ts'), tsContent, 'utf8');
fs.writeFileSync(path.join(boardDir, 'shop-board.component.html'), htmlContent, 'utf8');
fs.writeFileSync(path.join(boardDir, 'shop-board.component.css'), cssContent, 'utf8');
console.log("Shop Board Updated!");