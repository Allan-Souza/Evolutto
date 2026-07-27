import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="login-container">
      <img src="main-logo.png" alt="Evolutto" class="main-logo" />
      <p class="slogan">Sua jornada épica começa agora. Complete hábitos, ganhe recompensas e suba de nível na vida real!</p>
      
      <div class="login-actions glass-panel">
        <button class="btn-primary btn-adventurer" (click)="loginAsChild()">🎮 Entrar como Aventureiro</button>
        <button class="btn-primary btn-solo" (click)="loginAsSolo()">🐺 Entrar como Lobo Solitário</button>
        <button class="btn-secondary" (click)="loginAsParent()">🛡️ Entrar como Guardião</button>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
      padding: 32px;
    }
    .main-logo {
      max-width: 250px;
      margin-bottom: 16px;
      animation: fadeIn 1s ease-out;
    }
    .slogan { 
      color: var(--text-secondary); 
      margin-bottom: 32px; 
      max-width: 400px;
      line-height: 1.5;
      font-size: 1.1rem;
    }
    .login-actions {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 32px 24px;
      width: 100%;
      max-width: 320px;
      border-radius: var(--radius-lg);
    }
    .btn-adventurer {
      background: rgba(59, 130, 246, 0.2);
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
    }
    .btn-adventurer:hover {
      background: var(--primary-color);
      color: white;
    }
    .btn-solo {
      background: rgba(139, 92, 246, 0.2);
      border: 1px solid #8b5cf6;
      color: #c4b5fd;
    }
    .btn-solo:hover {
      background: #8b5cf6;
      color: white;
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-secondary);
      padding: 12px 16px;
      border-radius: var(--radius-md);
      font-weight: bold;
      cursor: pointer;
      transition: var(--transition);
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.15);
      color: white;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class LoginComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/habits']);
    }
  }

  loginAsChild() {
    this.auth.login('mock-token-child', 'ADVENTURER');
    this.router.navigate(['/habits']);
  }

  loginAsSolo() {
    this.auth.login('mock-token-solo', 'SOLO');
    this.router.navigate(['/habits']);
  }

  loginAsParent() {
    this.auth.login('mock-token-parent', 'GUARDIAN');
    this.router.navigate(['/parental']);
  }
}
