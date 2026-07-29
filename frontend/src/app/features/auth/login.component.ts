import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { UserStoreService } from '../../core/store/user-store.service';

type LoginView = 'ROLE_SELECTION' | 'LOGIN' | 'REGISTER';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <img src="main-logo.png" alt="Evolutto" class="main-logo" />
      <p class="slogan" *ngIf="currentView === 'ROLE_SELECTION'">Sua jornada épica começa agora. Complete hábitos, ganhe recompensas e suba de nível na vida real!</p>
      
      <div class="login-actions glass-panel" [ngSwitch]="currentView">
        
        <!-- View 1: Seleção de Papel -->
        <ng-container *ngSwitchCase="'ROLE_SELECTION'">
          <h2 class="view-title">Quem é você?</h2>
          <button class="btn-primary btn-adventurer" (click)="selectRole('ADVENTURER')">🎮 Aventureiro</button>
          <button class="btn-primary btn-solo" (click)="selectRole('SOLO')">🐺 Lobo Solitário</button>
          <button class="btn-secondary" (click)="selectRole('GUARDIAN')">🛡️ Guardião</button>
        </ng-container>

        <!-- View 2: Login Form -->
        <ng-container *ngSwitchCase="'LOGIN'">
          <h2 class="view-title">Entrar como {{ getRoleName() }}</h2>
          <form [formGroup]="authForm" (ngSubmit)="onLogin()">
            
            <div class="form-group">
              <label>Nome de Usuário</label>
              <input type="text" formControlName="username" placeholder="Digite seu nome heroico..." />
            </div>

            <div class="form-group">
              <label>Senha</label>
              <input type="password" formControlName="password" placeholder="Sua senha secreta..." />
            </div>

            <div class="error-msg" *ngIf="errorMessage">{{ errorMessage }}</div>

            <div class="form-actions">
              <button type="submit" class="btn-primary" [disabled]="authForm.invalid || isLoading">
                {{ isLoading ? 'Entrando...' : 'Entrar' }}
              </button>
              <button type="button" class="btn-link" (click)="switchView('REGISTER')">Não tem conta? Registre-se</button>
              <button type="button" class="btn-back" (click)="switchView('ROLE_SELECTION')">Voltar</button>
            </div>
          </form>
        </ng-container>

        <!-- View 3: Register Form -->
        <ng-container *ngSwitchCase="'REGISTER'">
          <h2 class="view-title">Criar {{ getRoleName() }}</h2>
          <form [formGroup]="authForm" (ngSubmit)="onRegister()">
            
            <div class="form-group">
              <label>Escolha um Nome de Usuário</label>
              <input type="text" formControlName="username" placeholder="Como serás conhecido?" />
            </div>

            <div class="form-group">
              <label>Escolha uma Senha</label>
              <input type="password" formControlName="password" placeholder="Uma senha forte..." />
            </div>

            <div class="error-msg" *ngIf="errorMessage">{{ errorMessage }}</div>

            <div class="form-actions">
              <button type="submit" class="btn-primary" [disabled]="authForm.invalid || isLoading">
                {{ isLoading ? 'Registrando...' : 'Criar Conta' }}
              </button>
              <button type="button" class="btn-link" (click)="switchView('LOGIN')">Já tem conta? Entrar</button>
              <button type="button" class="btn-back" (click)="switchView('ROLE_SELECTION')">Voltar</button>
            </div>
          </form>
        </ng-container>

      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
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
      animation: fadeIn 1.2s ease-out;
    }
    .login-actions {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 32px 24px;
      width: 100%;
      max-width: 340px;
      border-radius: var(--radius-lg);
      animation: slideUp 0.4s ease-out;
    }
    .view-title {
      font-size: 1.2rem;
      color: white;
      margin-bottom: 16px;
    }
    .btn-adventurer {
      background: rgba(59, 130, 246, 0.2);
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
      width: 100%;
    }
    .btn-adventurer:hover {
      background: var(--primary-color);
      color: white;
    }
    .btn-solo {
      background: rgba(139, 92, 246, 0.2);
      border: 1px solid #8b5cf6;
      color: #c4b5fd;
      width: 100%;
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
      width: 100%;
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.15);
      color: white;
    }
    
    /* Formulários */
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      text-align: left;
    }
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-size: 0.9rem;
      color: var(--text-secondary);
    }
    .form-group input {
      width: 100%;
      padding: 12px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-md);
      color: white;
    }
    .form-group input:focus {
      outline: none;
      border-color: var(--primary-color);
    }
    .error-msg {
      color: var(--danger-color);
      font-size: 0.85rem;
      text-align: center;
    }
    .form-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 8px;
    }
    .form-actions .btn-primary { width: 100%; }
    
    .btn-link, .btn-back {
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 0.9rem;
      padding: 8px;
      transition: var(--transition);
    }
    .btn-link { color: var(--primary-color); }
    .btn-link:hover { color: white; text-decoration: underline; }
    
    .btn-back { color: var(--text-secondary); }
    .btn-back:hover { color: white; }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class LoginComponent implements OnInit {
  private auth = inject(AuthService);
  private userStore = inject(UserStoreService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  currentView: LoginView = 'ROLE_SELECTION';
  selectedRole: string = '';
  errorMessage: string | null = null;
  isLoading = false;

  authForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.redirectByRole(this.auth.currentRole());
    }
  }

  selectRole(role: string) {
    this.selectedRole = role;
    this.authForm.reset();
    this.errorMessage = null;
    this.currentView = 'LOGIN';
  }

  switchView(view: LoginView) {
    this.currentView = view;
    this.errorMessage = null;
    this.authForm.reset();
  }

  getRoleName(): string {
    switch(this.selectedRole) {
      case 'ADVENTURER': return 'Aventureiro';
      case 'SOLO': return 'Lobo Solitário';
      case 'GUARDIAN': return 'Guardião';
      default: return 'Usuário';
    }
  }

  onLogin() {
    if (this.authForm.invalid) return;
    
    this.isLoading = true;
    this.errorMessage = null;
    const { username, password } = this.authForm.value;

    this.auth.login(username, password, this.selectedRole).subscribe(res => {
      this.isLoading = false;
      if (res.success && res.user) {
        this.userStore.updateProfile(res.user.username, res.user.avatar);
        this.redirectByRole(res.user.role);
      } else {
        this.errorMessage = res.message || 'Erro ao realizar login.';
      }
    });
  }

  onRegister() {
    if (this.authForm.invalid) return;
    
    this.isLoading = true;
    this.errorMessage = null;
    const { username, password } = this.authForm.value;

    this.auth.register(username, password, this.selectedRole).subscribe(res => {
      this.isLoading = false;
      if (res.success && res.user) {
        this.userStore.updateProfile(res.user.username, res.user.avatar);
        this.redirectByRole(res.user.role);
      } else {
        this.errorMessage = res.message || 'Erro ao criar conta.';
      }
    });
  }

  private redirectByRole(role: string) {
    if (role === 'GUARDIAN') {
      this.router.navigate(['/parental']);
    } else {
      this.router.navigate(['/habits']);
    }
  }
}
