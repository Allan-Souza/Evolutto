import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-role-explanation',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  template: `
    <div class="explanation-container">
      <h1 class="main-title">Entenda os Perfis</h1>
      <p class="subtitle">Descubra qual jornada combina mais com você.</p>

      <div class="roles-grid">
        
        <!-- Aventureiro -->
        <div class="role-card glass-panel">
          <div class="icon-wrapper adventurer-icon">
            <ng-icon name="lucideSwords"></ng-icon>
          </div>
          <h2>Aventureiro</h2>
          <p>
            Ideal para quem está começando. Cumpra hábitos diários, ganhe pontos de experiência (XP) e acumule moedas.
            Nesta jornada, falhar em hábitos negativos não gera penalidades severas, mantendo o foco no reforço positivo.
          </p>
        </div>

        <!-- Lobo Solitário -->
        <div class="role-card glass-panel">
          <div class="icon-wrapper solo-icon">
            <ng-icon name="lucideFlame"></ng-icon>
          </div>
          <h2>Lobo Solitário</h2>
          <p>
            Para os mais dedicados. Funciona da mesma forma que o Aventureiro, mas com apostas reais. 
            Se você falhar em um hábito (ou realizar um hábito negativo), você <strong>perde XP e Moedas</strong>. 
            A consistência é a chave para a evolução!
          </p>
        </div>

        <!-- Guardião -->
        <div class="role-card glass-panel">
          <div class="icon-wrapper guardian-icon">
            <ng-icon name="lucideShield"></ng-icon>
          </div>
          <h2>Guardião</h2>
          <p>
            Feito para pais, mentores ou responsáveis. O Guardião possui um painel de controle exclusivo onde pode visualizar o progresso dos seus Aventureiros, aprovar missões e, caso necessário, congelar as recompensas através de Debuffs.
          </p>
        </div>

      </div>

      <div class="actions-section">
        <button class="btn-primary" (click)="goToLogin()">Fazer Login</button>
        <button class="btn-secondary" (click)="goToRegister()">Criar Cadastro</button>
      </div>
    </div>
  `,
  styles: [`
    .explanation-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 48px 24px;
      animation: fadeIn 0.5s ease-out;
      text-align: center;
    }
    .main-title {
      font-size: 2.5rem;
      margin-bottom: 8px;
    }
    .subtitle {
      color: var(--text-secondary);
      font-size: 1.1rem;
      margin-bottom: 48px;
    }
    
    .roles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 48px;
    }
    
    .role-card {
      padding: 32px 24px;
      border-radius: var(--radius-lg);
      text-align: center;
      transition: var(--transition);
    }
    .role-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    
    .icon-wrapper {
      width: 64px;
      height: 64px;
      margin: 0 auto 16px auto;
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
    }
    .adventurer-icon { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
    .solo-icon { background: rgba(139, 92, 246, 0.2); color: #8b5cf6; }
    .guardian-icon { background: rgba(16, 185, 129, 0.2); color: #10b981; }

    .role-card h2 {
      font-size: 1.4rem;
      margin-bottom: 12px;
    }
    .role-card p {
      color: var(--text-secondary);
      line-height: 1.6;
      font-size: 0.95rem;
    }

    .actions-section {
      display: flex;
      justify-content: center;
      gap: 16px;
    }
    .actions-section button {
      padding: 12px 32px;
      font-size: 1.1rem;
      border-radius: var(--radius-full);
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition);
    }
    .btn-primary {
      border: none;
      background: var(--primary-color);
      color: white;
    }
    .btn-primary:hover { background: #2563eb; }
    
    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-primary);
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class RoleExplanationComponent {
  private router = inject(Router);

  goToLogin() {
    this.router.navigate(['/login'], { queryParams: { mode: 'LOGIN' } });
  }

  goToRegister() {
    this.router.navigate(['/login'], { queryParams: { mode: 'REGISTER' } });
  }
}
