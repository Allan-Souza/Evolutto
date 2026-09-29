const fs = require('fs');

// 1. Corrigindo o HTML do modal para renderizar acentos corretamente
const htmlFile = 'src/app/features/parental/components/reward-form-modal/reward-form-modal.component.html';
const htmlContent = `<div class="modal-overlay" *ngIf="show">
  <div class="modal-content glass-panel animate-slide-up">
    <div class="modal-header">
      <h2>Nova Recompensa</h2>
    </div>
    
    <div class="form-group">
      <label>T\u00EDtulo da Recompensa</label>
      <input type="text" class="rpg-input" [(ngModel)]="request.title" placeholder="Ex: Cinema com a m\u00E3e" />
    </div>

    <div class="form-group">
      <label>Custo (Moedas \uD83E\uDE99)</label>
      <input type="number" class="rpg-input" [(ngModel)]="request.cost" placeholder="Ex: 100" />
    </div>

    <div class="modal-actions">
      <button class="btn-secondary" (click)="onClose()">Cancelar</button>
      <button class="btn-primary" (click)="onSave()" [disabled]="!request.title || !request.cost">Adicionar \u00E0 Loja</button>
    </div>
  </div>
</div>`;
fs.writeFileSync(htmlFile, htmlContent, 'utf8');

// 2. Aplicando o mesmo CSS elegante do modal de hábitos
const cssFile = 'src/app/features/parental/components/reward-form-modal/reward-form-modal.component.css';
const cssContent = `.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  width: 90%;
  max-width: 400px;
  padding: 24px;
  background: var(--bg-color);
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
  animation: slideUp 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-header h2 {
  font-size: 1.4rem;
  color: var(--text-primary);
  margin: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  flex: 1;
}

label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

input {
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-sm);
  padding: 12px;
  color: var(--text-primary);
  font-family: var(--font-family);
  font-size: 1rem;
  outline: none;
  transition: var(--transition);
}

input:focus {
  border-color: var(--primary-color);
  background: rgba(255,255,255,0.1);
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 32px;
}

.btn-secondary {
  flex: 1;
  background: rgba(255,255,255,0.1);
  color: var(--text-primary);
  border: none;
  padding: 12px;
  border-radius: var(--radius-full);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.btn-secondary:hover {
  background: rgba(255,255,255,0.2);
}

.btn-primary {
  flex: 1;
  padding: 12px;
  border-radius: var(--radius-full);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
`;
fs.writeFileSync(cssFile, cssContent, 'utf8');

console.log("Modal style and text fixed!");