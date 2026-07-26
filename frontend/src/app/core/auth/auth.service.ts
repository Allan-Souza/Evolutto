import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token = signal<string | null>(null);
  private role = signal<string>('STANDARD');

  isAuthenticated(): boolean { return !!this.token(); }
  getToken(): string | null { return this.token(); }
  currentRole(): string { return this.role(); }
  hasRole(requiredRole: string): boolean { return this.role() === requiredRole; }
  login(token: string, role: string) { this.token.set(token); this.role.set(role); }
  logout() { this.token.set(null); this.role.set('STANDARD'); }
}
