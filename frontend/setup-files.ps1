$dirs = @(
    "src\app\core\auth",
    "src\app\features\auth",
    "src\app\features\habits",
    "src\app\features\shop",
    "src\app\features\parental"
)

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

$authGuard = @"
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) return true;
  return router.parseUrl('/login');
};
"@

$roleGuard = @"
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.hasRole('PARENT')) return true;
  return router.parseUrl('/habits');
};
"@

$jwtInterceptor = @"
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  if (token) {
    req = req.clone({ setHeaders: { Authorization: \`Bearer \`$token\` } });
  }
  return next(req);
};
"@

$authService = @"
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token = signal<string | null>(null);
  private role = signal<string>('STANDARD');

  isAuthenticated(): boolean { return !!this.token(); }
  getToken(): string | null { return this.token(); }
  hasRole(requiredRole: string): boolean { return this.role() === requiredRole; }
  login(token: string, role: string) { this.token.set(token); this.role.set(role); }
  logout() { this.token.set(null); this.role.set('STANDARD'); }
}
"@

$loginComponent = @"
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  template: '<h2>Login</h2>'
})
export class LoginComponent {}
"@

$emptyRoute = @"
import { Routes } from '@angular/router';
export const ROUTES: Routes = [];
"@

Set-Content -Path "src\app\core\auth\auth.guard.ts" -Value $authGuard
Set-Content -Path "src\app\core\auth\role.guard.ts" -Value $roleGuard
Set-Content -Path "src\app\core\auth\jwt.interceptor.ts" -Value $jwtInterceptor
Set-Content -Path "src\app\core\auth\auth.service.ts" -Value $authService
Set-Content -Path "src\app\features\auth\login.component.ts" -Value $loginComponent

Set-Content -Path "src\app\features\habits\habits.routes.ts" -Value $emptyRoute.Replace("ROUTES", "HABIT_ROUTES")
Set-Content -Path "src\app\features\shop\shop.routes.ts" -Value $emptyRoute.Replace("ROUTES", "SHOP_ROUTES")
Set-Content -Path "src\app\features\parental\parental.routes.ts" -Value $emptyRoute.Replace("ROUTES", "PARENTAL_ROUTES")

$appRoutes = @"
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'habits', 
    loadChildren: () => import('./features/habits/habits.routes').then(m => m.HABIT_ROUTES),
    canActivate: [authGuard]
  },
  { 
    path: 'shop', 
    loadChildren: () => import('./features/shop/shop.routes').then(m => m.SHOP_ROUTES),
    canActivate: [authGuard]
  },
  { 
    path: 'parental', 
    loadChildren: () => import('./features/parental/parental.routes').then(m => m.PARENTAL_ROUTES),
    canActivate: [authGuard, roleGuard]
  },
  { path: '', redirectTo: '/habits', pathMatch: 'full' }
];
"@
Set-Content -Path "src\app\app.routes.ts" -Value $appRoutes

$appConfig = @"
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './core/auth/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor]))
  ]
};
"@
Set-Content -Path "src\app\app.config.ts" -Value $appConfig

Write-Host "Setup completo!"
