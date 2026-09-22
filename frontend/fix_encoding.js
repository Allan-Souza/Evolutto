const fs = require('fs');

// 1. Corrigindo o HTML do Painel Parental (Reescrevendo limpo com Unicode Escapes puros)
const htmlFile = 'src/app/features/parental/components/parental-dashboard/parental-dashboard.component.html';
const htmlContent = `<div class="parental-dashboard-container">
  <div class="header-actions">
    <h2>Vis\u00E3o do Guardi\u00E3o</h2>
  </div>

  <div class="glass-panel link-panel">
    <div class="link-panel-header">
      <h3 style="margin-top: 0; display: flex; align-items: center; gap: 0.5rem;">
        <span style="font-size: 1.2rem;">\uD83D\uDD17</span> Vincular Aventureiro
      </h3>
      <p class="subtitle">
        Digite o username exato do aventureiro que voc\u00EA ir\u00E1 supervisionar.
      </p>
    </div>
    <div class="input-group">
      <div class="input-wrapper">
        <span class="input-icon">\uD83D\uDC64</span>
        <input type="text" class="rpg-input" [(ngModel)]="linkUsername" placeholder="Ex: alex_rpg" />
      </div>
      <button class="btn-primary link-btn" (click)="onLinkAdventurer()">Vincular</button>
    </div>
  </div>

  <h3 class="section-title">Meus Aventureiros</h3>
  
  <div *ngIf="isLoading" class="loading-state glass-panel">
    Buscando aventureiros... \u23F3
  </div>

  <div *ngIf="!isLoading && adventurers.length === 0" class="empty-state glass-panel">
    Voc\u00EA ainda n\u00E3o tem nenhum Aventureiro sob sua supervis\u00E3o.
  </div>

  <div class="approvals-list" *ngIf="!isLoading && adventurers.length > 0">
    <div class="approval-card glass-panel animate-slide-up" *ngFor="let adv of adventurers" style="flex-direction: column; align-items: flex-start; gap: 1rem; position: relative; overflow: hidden;">
      
      <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
        <div class="approval-info">
          <h4 style="margin: 0; font-size: 1.2rem; color: var(--text-color);">\uD83D\uDC64 {{ adv.username }} <span class="badge level-badge">Nv. {{ adv.level }}</span></h4>
          <div class="stats-row" style="margin-top: 0.5rem; display: flex; gap: 1rem;">
            <span class="stat-pill xp"><span class="icon">\u2728</span> {{ adv.currentXp }} XP</span>
            <span class="stat-pill coins"><span class="icon">\uD83E\uDE99</span> {{ adv.currentCoins }}</span>
            <span class="stat-pill habits"><span class="icon">\u2705</span> {{ adv.totalHabitsCompleted }} H\u00E1bitos</span>
          </div>
        </div>
        <button class="btn-secondary" (click)="toggleLogs(adv.id)">
          {{ expandedAdventurer === adv.id ? 'Esconder Hist\u00F3rico' : 'Ver Hist\u00F3rico' }}
        </button>
      </div>

      <div *ngIf="adv.debuffCounter > 0" class="debuff-alert danger-pulse" style="width: 100%; border-radius: 8px; padding: 1rem; display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
        <div class="alert-content" style="display: flex; gap: 0.8rem; align-items: center;">
          <div class="alert-icon" style="font-size: 1.5rem;">\u26A0\uFE0F</div>
          <div class="alert-text">
            <h3 style="margin: 0; font-size: 1rem;">Aventureiro Penalizado</h3>
            <p style="margin: 0; font-size: 0.85rem;">Possui {{ adv.debuffCounter }} h\u00E1bitos ruins pendentes.</p>
          </div>
        </div>
        <button class="btn-primary unfreeze-btn" (click)="onPardon(adv.id)">Perdoar</button>
      </div>

      <div *ngIf="expandedAdventurer === adv.id" class="history-section" style="width: 100%; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
        <h5 style="margin: 0 0 1rem 0; color: var(--primary-color);">\u00DAltimas 10 Atividades</h5>
        
        <div *ngIf="!adventurerLogs[adv.id]" class="loading-text" style="font-size: 0.9rem; color: rgba(255,255,255,0.6);">Carregando...</div>
        <div *ngIf="adventurerLogs[adv.id]?.length === 0" class="empty-text" style="font-size: 0.9rem; color: rgba(255,255,255,0.6);">Nenhuma atividade registrada ainda.</div>
        
        <div class="log-list" style="display: flex; flex-direction: column; gap: 0.8rem;">
          <div class="log-item" *ngFor="let log of adventurerLogs[adv.id]" style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem; background: rgba(0,0,0,0.2); border-radius: 6px; border-left: 4px solid" [ngStyle]="{'border-color': log.status === 'COMPLETED' ? 'var(--success-color)' : log.status === 'REJECTED' ? 'var(--danger-color)' : '#ffa500'}">
            
            <div class="log-details" style="flex: 1;">
              <div class="log-title" style="font-weight: 500; display: flex; align-items: center; gap: 0.5rem;">
                {{ log.habitTitle }}
                <span *ngIf="log.status === 'PENDING_APPROVAL'" style="font-size: 0.7rem; background: rgba(255,165,0,0.2); color: #ffa500; padding: 2px 6px; border-radius: 10px;">Pendente</span>
                <span *ngIf="log.status === 'REJECTED'" style="font-size: 0.7rem; background: rgba(255,0,0,0.2); color: var(--danger-color); padding: 2px 6px; border-radius: 10px;">Rejeitado</span>
              </div>
              <div class="log-date" style="font-size: 0.75rem; color: rgba(255,255,255,0.5);">{{ log.executedAt | date:'dd/MM/yyyy HH:mm' }}</div>
            </div>
            
            <div *ngIf="log.status === 'PENDING_APPROVAL'" class="log-actions" style="display: flex; gap: 0.5rem;">
              <button class="btn-icon" style="background: rgba(255,0,0,0.2); border-radius: 50%; width: 30px; height: 30px; cursor: pointer; border: none; display: flex; align-items: center; justify-content: center;" (click)="onReviewHabit(adv.id, log.id, false)" title="Rejeitar">\u274C</button>
              <button class="btn-icon" style="background: rgba(0,255,0,0.2); border-radius: 50%; width: 30px; height: 30px; cursor: pointer; border: none; display: flex; align-items: center; justify-content: center;" (click)="onReviewHabit(adv.id, log.id, true)" title="Aprovar">\u2705</button>
            </div>

            <div *ngIf="log.status !== 'PENDING_APPROVAL'" class="log-rewards" style="display: flex; gap: 0.5rem; opacity: {{ log.status === 'REJECTED' ? '0.3' : '1' }}">
              <span class="reward xp-gain" style="color: var(--success-color); font-size: 0.85rem; font-weight: 600;">+{{ log.xpRewarded }} XP</span>
              <span class="reward coin-gain" style="color: var(--secondary-color); font-size: 0.85rem; font-weight: 600;">+{{ log.coinsRewarded }} \uD83E\uDE99</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
fs.writeFileSync(htmlFile, htmlContent, 'utf8');

// 2. Corrigindo o TS do Guardião (Mensagens de Toast)
const tsFile1 = 'src/app/features/parental/components/parental-dashboard/parental-dashboard.component.ts';
let content1 = fs.readFileSync(tsFile1, 'utf8');
content1 = content1.replace(/this\.toastService\.show\(approved \? .*? \: .*, approved \? 'success' : 'danger'\);/, `this.toastService.show(approved ? 'H\u00E1bito aprovado com sucesso! \u2705' : 'H\u00E1bito rejeitado. \u274C', approved ? 'success' : 'danger');`);
content1 = content1.replace(/Erro ao carregar hist.*/, `Erro ao carregar hist\u00F3rico.', 'danger');`);
fs.writeFileSync(tsFile1, content1, 'utf8');

// 3. Corrigindo o TS do Aventureiro (Mensagens de Toast)
const tsFile2 = 'src/app/features/habits/components/habit-list/habit-list.component.ts';
let content2 = fs.readFileSync(tsFile2, 'utf8');
content2 = content2.replace(/this\.toastService\.show\([^,]+, 'success'\);/, `this.toastService.show('Voc\u00EA ganhou +' + res.xpRewarded + ' XP!', 'success');`);
content2 = content2.replace(/this\.toastService\.show\([^,]+, 'warning'\);/, `this.toastService.show('H\u00E1bito enviado para aprova\u00E7\u00E3o do Guardi\u00E3o! \u23F3', 'warning');`);
fs.writeFileSync(tsFile2, content2, 'utf8');

console.log('Encoding fixed successfully!');