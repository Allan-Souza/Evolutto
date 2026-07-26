import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="login-container">
      <h1>Evolutto</h1>
      <p>Transforme sua rotina em um jogo épico!</p>
      
      <div class="login-actions glass-panel">
        <button class="btn-primary" (click)="loginAsChild()">🎮 Entrar como Criança</button>
        <button class="btn-secondary" (click)="loginAsParent()">👨‍👩‍👧 Entrar como Responsável</button>
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
    h1 { font-size: 2.5rem; color: var(--primary-color); margin-bottom: 8px; }
    p { color: var(--text-secondary); margin-bottom: 32px; }
    .login-actions {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 24px;
      width: 100%;
      max-width: 300px;
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      padding: 12px 16px;
      border-radius: var(--radius-md);
      font-weight: bold;
      cursor: pointer;
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
    this.auth.login('mock-token-child', 'STANDARD');
    this.router.navigate(['/habits']);
  }

  loginAsParent() {
    this.auth.login('mock-token-parent', 'PARENT');
    this.router.navigate(['/parental']);
  }
}
