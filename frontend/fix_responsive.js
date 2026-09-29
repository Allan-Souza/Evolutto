const fs = require('fs');

const htmlFile = 'src/app/features/parental/components/parental-dashboard/parental-dashboard.component.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');

// 1. Limpando a div de pending-deliveries (removendo os estilos embutidos)
const oldPending = `<div class="pending-deliveries" *ngIf="pendingPurchases.length > 0" style="margin-bottom: 2rem;">
    <h3 class="section-title" style="color: #ffa500; display: flex; align-items: center; gap: 0.5rem;">🎁 Entregas Pendentes</h3>
    <div class="delivery-card glass-panel" *ngFor="let purchase of pendingPurchases" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-left: 4px solid #ffa500;">
      <div>
        <h4 style="margin: 0; color: #fff;">{{ purchase.rewardTitle }}</h4>
        <p style="margin: 0.2rem 0 0 0; font-size: 0.85rem; color: rgba(255,255,255,0.7);">
          Comprado por: <strong style="color: var(--secondary-color)">{{ purchase.adventurerUsername }}</strong>
        </p>
      </div>
      <button class="btn-primary" style="background: var(--success-color);" (click)="onDeliverReward(purchase.id)">Marcar como Entregue ✅</button>
    </div>
  </div>`;

const newPending = `<div class="pending-deliveries" *ngIf="pendingPurchases.length > 0">
    <h3 class="section-title pending-title">🎁 Entregas Pendentes</h3>
    <div class="delivery-card glass-panel" *ngFor="let purchase of pendingPurchases">
      <div class="delivery-info">
        <h4>{{ purchase.rewardTitle }}</h4>
        <p>Comprado por: <strong>{{ purchase.adventurerUsername }}</strong></p>
      </div>
      <button class="btn-success" (click)="onDeliverReward(purchase.id)">Marcar como Entregue ✅</button>
    </div>
  </div>`;
htmlContent = htmlContent.replace(oldPending, newPending);

// 2. Limpando os botões de ação do aventureiro (+ Loja e Ver histórico)
const oldActions = `<div style="display: flex; gap: 0.5rem;">
          <button class="btn-primary" style="background: var(--secondary-color);" (click)="openRewardModal(adv.id)" title="Nova Recompensa">
            + Loja
          </button>
          <button class="btn-secondary" (click)="toggleLogs(adv.id)">
            {{ expandedAdventurer === adv.id ? 'Esconder Histórico' : 'Ver Histórico' }}
          </button>
        </div>`;
const newActions = `<div class="adv-actions">
          <button class="btn-secondary add-shop-btn" (click)="openRewardModal(adv.id)" title="Nova Recompensa">+ Loja</button>
          <button class="btn-secondary" (click)="toggleLogs(adv.id)">{{ expandedAdventurer === adv.id ? 'Esconder Histórico' : 'Ver Histórico' }}</button>
        </div>`;
htmlContent = htmlContent.replace(oldActions, newActions);

fs.writeFileSync(htmlFile, htmlContent, 'utf8');

// 3. Adicionando o CSS poderoso
const cssFile = 'src/app/features/parental/components/parental-dashboard/parental-dashboard.component.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');

const additionalCSS = `
/* === Estilos da Sessão de Entregas Pendentes === */
.pending-deliveries {
  margin-bottom: 2.5rem;
}

.pending-title {
  color: #ffa500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.delivery-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1.2rem;
  border-left: 4px solid #ffa500;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.delivery-card:hover {
  transform: translateX(5px);
  background: rgba(0, 0, 0, 0.3);
}

.delivery-info h4 {
  margin: 0 0 0.2rem 0;
  color: #fff;
  font-size: 1.1rem;
}

.delivery-info p {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.7);
}

.delivery-info strong {
  color: var(--secondary-color);
}

.btn-success {
  background: var(--success-color);
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-success:hover {
  background: #0d9668;
  transform: scale(1.02);
}

.adv-actions {
  display: flex;
  gap: 0.8rem;
}

.add-shop-btn {
  background: rgba(255, 165, 0, 0.2) !important;
  color: #ffa500 !important;
  border-color: #ffa500 !important;
}

.add-shop-btn:hover {
  background: rgba(255, 165, 0, 0.3) !important;
}

/* === Responsividade Atualizada (Mobile) === */
@media screen and (max-width: 768px) {
  .delivery-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .delivery-card .btn-success {
    width: 100%;
    text-align: center;
  }

  .adv-actions {
    flex-direction: column;
    width: 100%;
  }

  .adv-actions button {
    width: 100%;
  }
}
`;

cssContent = cssContent + additionalCSS;
fs.writeFileSync(cssFile, cssContent, 'utf8');

console.log("HTML and CSS fixed!");