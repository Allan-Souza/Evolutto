const fs = require('fs');
const path = require('path');

const rewardModalDir = 'src/app/features/parental/components/reward-form-modal';
if (!fs.existsSync(rewardModalDir)) fs.mkdirSync(rewardModalDir, { recursive: true });

// 1. Reward Form Modal TS
const modalTs = `import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RewardRequest } from '../../../../core/models/reward.model';

@Component({
  selector: 'app-reward-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reward-form-modal.component.html',
  styleUrls: ['./reward-form-modal.component.css']
})
export class RewardFormModalComponent {
  @Input() show = false;
  @Input() adventurerId: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<RewardRequest>();

  request: RewardRequest = { title: '', description: '', cost: 50, targetId: '' };

  onClose() {
    this.close.emit();
  }

  onSave() {
    this.request.targetId = this.adventurerId;
    this.save.emit(this.request);
    this.request = { title: '', description: '', cost: 50, targetId: '' };
  }
}
`;
fs.writeFileSync(path.join(rewardModalDir, 'reward-form-modal.component.ts'), modalTs, 'utf8');

// 2. Reward Form Modal HTML
const modalHtml = `<div class="modal-overlay" *ngIf="show">
  <div class="modal-content glass-panel animate-slide-up">
    <h3>Nova Recompensa</h3>
    
    <div class="form-group">
      <label>T\\u00EDtulo da Recompensa</label>
      <input type="text" class="rpg-input" [(ngModel)]="request.title" placeholder="Ex: Cinema com a m\\u00E3e" />
    </div>

    <div class="form-group">
      <label>Custo (Moedas \\uD83E\\uDE99)</label>
      <input type="number" class="rpg-input" [(ngModel)]="request.cost" placeholder="Ex: 100" />
    </div>

    <div class="modal-actions">
      <button class="btn-secondary" (click)="onClose()">Cancelar</button>
      <button class="btn-primary" (click)="onSave()" [disabled]="!request.title || !request.cost">Adicionar \\u00E0 Loja</button>
    </div>
  </div>
</div>`;
fs.writeFileSync(path.join(rewardModalDir, 'reward-form-modal.component.html'), modalHtml, 'utf8');

// 3. Reward Form Modal CSS
const modalCss = `.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex; justify-content: center; align-items: center;
  z-index: 1000;
}
.modal-content {
  width: 90%; max-width: 400px;
  padding: 2rem; border-radius: 12px;
  background: var(--surface-color); border: 1px solid rgba(255,255,255,0.1);
}
.modal-actions {
  display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;
}
`;
fs.writeFileSync(path.join(rewardModalDir, 'reward-form-modal.component.css'), modalCss, 'utf8');

// 4. Update Parental Dashboard TS
const dashTsFile = 'src/app/features/parental/components/parental-dashboard/parental-dashboard.component.ts';
let dashTs = fs.readFileSync(dashTsFile, 'utf8');
// Add imports
dashTs = dashTs.replace(`import { HabitLogResponse } from '../../services/parental.service';`, `import { HabitLogResponse } from '../../services/parental.service';\nimport { RewardService } from '../../../../core/services/reward.service';\nimport { PurchaseResponse, RewardRequest } from '../../../../core/models/reward.model';\nimport { RewardFormModalComponent } from '../reward-form-modal/reward-form-modal.component';`);
dashTs = dashTs.replace(`imports: [CommonModule, FormsModule]`, `imports: [CommonModule, FormsModule, RewardFormModalComponent]`);
// Inject RewardService
dashTs = dashTs.replace(`private parentalService = inject(ParentalService);`, `private parentalService = inject(ParentalService);\n  private rewardService = inject(RewardService);`);
// Add State Variables
dashTs = dashTs.replace(`linkUsername = '';`, `linkUsername = '';\n  pendingPurchases: PurchaseResponse[] = [];\n  showRewardModal = false;\n  selectedAdvForReward = '';`);
// Fetch pending purchases on init
dashTs = dashTs.replace(`this.loadAdventurers();`, `this.loadAdventurers();\n    this.loadPendingPurchases();`);

const addMethods = `
  loadPendingPurchases() {
    this.rewardService.getPendingPurchases().subscribe(data => this.pendingPurchases = data);
  }

  openRewardModal(advId: string) {
    this.selectedAdvForReward = advId;
    this.showRewardModal = true;
  }

  onSaveReward(request: RewardRequest) {
    this.rewardService.createReward(request).subscribe({
      next: () => {
        this.toastService.show('Recompensa adicionada \\u00E0 lojinha do Aventureiro!', 'success');
        this.showRewardModal = false;
      },
      error: () => this.toastService.show('Erro ao criar recompensa', 'danger')
    });
  }

  onDeliverReward(purchaseId: string) {
    this.rewardService.deliverReward(purchaseId).subscribe({
      next: () => {
        this.toastService.show('Pr\\u00EAmio entregue com sucesso! \\u2728', 'success');
        this.loadPendingPurchases();
      },
      error: () => this.toastService.show('Erro ao entregar pr\\u00EAmio', 'danger')
    });
  }
`;
dashTs = dashTs.replace(`onLinkAdventurer() {`, addMethods + `\n  onLinkAdventurer() {`);
fs.writeFileSync(dashTsFile, dashTs, 'utf8');

// 5. Update Parental Dashboard HTML
const dashHtmlFile = 'src/app/features/parental/components/parental-dashboard/parental-dashboard.component.html';
let dashHtml = fs.readFileSync(dashHtmlFile, 'utf8');

const pendingPurchasesHtml = `
  <div class="pending-deliveries" *ngIf="pendingPurchases.length > 0" style="margin-bottom: 2rem;">
    <h3 class="section-title" style="color: #ffa500; display: flex; align-items: center; gap: 0.5rem;">\\uD83C\\uDF81 Entregas Pendentes</h3>
    <div class="delivery-card glass-panel" *ngFor="let purchase of pendingPurchases" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-left: 4px solid #ffa500;">
      <div>
        <h4 style="margin: 0; color: #fff;">{{ purchase.rewardTitle }}</h4>
        <p style="margin: 0.2rem 0 0 0; font-size: 0.85rem; color: rgba(255,255,255,0.7);">
          Comprado por: <strong style="color: var(--secondary-color)">{{ purchase.adventurerUsername }}</strong>
        </p>
      </div>
      <button class="btn-primary" style="background: var(--success-color);" (click)="onDeliverReward(purchase.id)">Marcar como Entregue \\u2705</button>
    </div>
  </div>

  <h3 class="section-title">Meus Aventureiros</h3>
`;
dashHtml = dashHtml.replace(`<h3 class="section-title">Meus Aventureiros</h3>`, pendingPurchasesHtml);

const createRewardBtnHtml = `
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn-primary" style="background: var(--secondary-color);" (click)="openRewardModal(adv.id)" title="Nova Recompensa">
            + Loja
          </button>
          <button class="btn-secondary" (click)="toggleLogs(adv.id)">
            {{ expandedAdventurer === adv.id ? 'Esconder Hist\\u00F3rico' : 'Ver Hist\\u00F3rico' }}
          </button>
        </div>
      </div>
`;
dashHtml = dashHtml.replace(/<button class="btn-secondary" \(click\)="toggleLogs\(adv\.id\)">[^]*?<\/button>\s*<\/div>/, createRewardBtnHtml);

dashHtml = dashHtml + `\n<app-reward-form-modal [show]="showRewardModal" [adventurerId]="selectedAdvForReward" (close)="showRewardModal = false" (save)="onSaveReward($event)"></app-reward-form-modal>`;

fs.writeFileSync(dashHtmlFile, dashHtml, 'utf8');

console.log("Parental Dashboard updated with Rewards UI!");