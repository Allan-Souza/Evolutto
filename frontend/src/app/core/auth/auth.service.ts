import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { AuthResponse, UserAccount } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token = signal<string | null>(null);
  private role = signal<string>('STANDARD');

  // Banco de Dados em Memória (Mock)
  private users: UserAccount[] = [
    { id: '1', username: 'Arthur', password: '123', role: 'ADVENTURER', avatar: 'lucideUser' },
    { id: '2', username: 'Lobo', password: '123', role: 'SOLO', avatar: 'lucideUser' },
    { id: '3', username: 'Pai', password: '123', role: 'GUARDIAN', avatar: 'lucideShield' }
  ];

  isAuthenticated(): boolean { return !!this.token(); }
  getToken(): string | null { return this.token(); }
  currentRole(): string { return this.role(); }
  hasRole(requiredRole: string): boolean { return this.role() === requiredRole; }
  
  // Utilizado para login forçado temporário (retrocompatibilidade caso necessário)
  loginFallback(token: string, role: string) { this.token.set(token); this.role.set(role); }
  
  logout() { this.token.set(null); this.role.set('STANDARD'); }

  login(username: string, password: string): Observable<AuthResponse> {
    const user = this.users.find(u => u.username === username && u.password === password);
    
    if (user) {
      this.token.set(`mock-token-${user.id}`);
      this.role.set(user.role);
      return of({ success: true, token: this.token()!, user }).pipe(delay(800));
    }
    
    return of({ success: false, message: 'Usuário ou senha incorretos.' }).pipe(delay(800));
  }

  register(username: string, password: string, role: string): Observable<AuthResponse> {
    const exists = this.users.find(u => u.username === username);
    if (exists) {
      return of({ success: false, message: 'Este nome de usuário já está em uso.' }).pipe(delay(800));
    }

    const newUser: UserAccount = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      password,
      role,
      avatar: role === 'GUARDIAN' ? 'lucideShield' : 'lucideUser'
    };

    this.users.push(newUser);
    
    this.token.set(`mock-token-${newUser.id}`);
    this.role.set(newUser.role);
    
    return of({ success: true, token: this.token()!, user: newUser }).pipe(delay(800));
  }
}
