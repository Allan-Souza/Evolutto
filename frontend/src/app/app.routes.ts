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
