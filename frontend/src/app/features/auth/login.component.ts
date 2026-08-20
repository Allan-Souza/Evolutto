import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { UserStoreService } from '../../core/store/user-store.service';

type LoginView = 'LOGIN' | 'REGISTER';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="login-container">
      <img src="main-logo.png" alt="Evolutto" class="main-logo" />
      <p class="slogan" *ngIf="currentView === 'LOGIN'">Sua jornada épica começa agora. Complete hábitos, ganhe recompensas e suba de nível na vida real!</p>
      
      <div class="login-actions glass-panel">
        
        <!-- Login Form -->
        <ng-container *ngIf="currentView === 'LOGIN'">
          <h2 class="view-title">Entrar na sua conta</h2>
          <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
            
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
              <button type="submit" class="btn-primary" [disabled]="loginForm.invalid || isLoading">
                {{ isLoading ? 'Entrando...' : 'Entrar' }}
              </button>
              <button type="button" class="btn-link" (click)="switchView('REGISTER')">Não tem conta? Registre-se</button>
              <a class="info-link" routerLink="/roles-info">Entenda cada tipo de perfil</a>
            </div>
          </form>
        </ng-container>

        <!-- Register Form -->
        <ng-container *ngIf="currentView === 'REGISTER'">
          <h2 class="view-title">Criar nova conta</h2>
          <form [formGroup]="registerForm" (ngSubmit)="onRegister()">
            
            <div class="form-group">
              <label>Escolha um Nome de Usuário</label>
              <input type="text" formControlName="username" placeholder="Como serás conhecido?" />
            </div>

            <div class="form-group">
              <label>Escolha uma Senha</label>
              <input type="password" formControlName="password" placeholder="Uma senha forte..." />
            </div>

            <div class="form-group">
              <label>Tipo de Perfil</label>
              <div class="role-selector">
                <button type="button" class="role-btn" 
                  [class.selected]="registerForm.get('role')?.value === 'ADVENTURER'"
                  (click)="selectRole('ADVENTURER')">
                  🎮 Aventureiro
                </button>
                <button type="button" class="role-btn" 
                  [class.selected]="registerForm.get('role')?.value === 'SOLO'"
                  (click)="selectRole('SOLO')">
                  🐺 Lobo Solitário
                </button>
                <button type="button" class="role-btn" 
                  [class.selected]="registerForm.get('role')?.value === 'GUARDIAN'"
                  (click)="selectRole('GUARDIAN')">
                  🛡️ Guardião
                </button>
              </div>
            </div>

            <div class="error-msg" *ngIf="errorMessage">{{ errorMessage }}</div>

            <div class="form-actions">
              <button type="submit" class="btn-primary" [disabled]="registerForm.invalid || isLoading">
                {{ isLoading ? 'Registrando...' : 'Criar Conta' }}
              </button>
              <button type="button" class="btn-link" (click)="switchView('LOGIN')">Já tem conta? Entrar</button>
              <a class="info-link" routerLink="/roles-info">Entenda cada tipo de perfil</a>
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
      max-width: 380px;
      border-radius: var(--radius-lg);
      animation: slideUp 0.4s ease-out;
    }
    .view-title {
      font-size: 1.2rem;
      color: white;
      margin-bottom: 8px;
    }

    /* FormulÃ¡rios */
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
      font-size: 1rem;
      font-family: var(--font-family);
    }
    .form-group input:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    /* Role Selector */
    .role-selector {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .role-btn {
      padding: 10px 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-md);
      color: var(--text-secondary);
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition);
      text-align: left;
    }
    .role-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-primary);
    }
    .role-btn.selected {
      border-color: var(--primary-color);
      background: rgba(59, 130, 246, 0.15);
      color: var(--primary-color);
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

    .info-link {
      color: var(--text-secondary);
      font-size: 0.85rem;
      text-decoration: none;
      transition: var(--transition);
      display: block;
      text-align: center;
    }
    .info-link:hover {
      color: var(--primary-color);
      text-decoration: underline;
    }

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
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  currentView: LoginView = 'LOGIN';
  errorMessage: string | null = null;
  isLoading = false;

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    role: ['', Validators.required]
  });

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.redirectByRole(this.auth.currentRole());
    }

    this.route.queryParams.subscribe(params => {
      if (params['mode'] === 'REGISTER') {
        this.currentView = 'REGISTER';
      }
    });
  }

  selectRole(role: string) {
    this.registerForm.patchValue({ role });
  }

  switchView(view: LoginView) {
    this.currentView = view;
    this.errorMessage = null;
    this.loginForm.reset();
    this.registerForm.reset();
  }

  onLogin() {
    if (this.loginForm.invalid) return;
    
    this.isLoading = true;
    this.errorMessage = null;
    const { username, password } = this.loginForm.value;

    this.auth.login(username, password).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.redirectByRole(res.user.role);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.error || 'Erro ao realizar login.';
      }
    });
  }

  onRegister() {
    if (this.registerForm.invalid) return;
    
    this.isLoading = true;
    this.errorMessage = null;
    const { username, password, role } = this.registerForm.value;

    this.auth.register(username, password, role).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.redirectByRole(res.user.role);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.error || 'Erro ao criar conta.';
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


