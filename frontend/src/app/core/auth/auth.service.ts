import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, UserProfile } from '../models/auth.model';
import { UserStoreService } from '../store/user-store.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private userStore = inject(UserStoreService);

  private readonly API_URL = 'http://localhost:8080/api/v1/auth';
  private readonly TOKEN_KEY = 'evolutto_jwt';

  private token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));
  private role = signal<string>('STANDARD');

  isAuthenticated(): boolean { return !!this.token(); }
  getToken(): string | null { return this.token(); }
  currentRole(): string { return this.role(); }
  hasRole(requiredRole: string): boolean { return this.role() === requiredRole; }
  
  logout() { 
    this.token.set(null); 
    this.role.set('STANDARD'); 
    localStorage.removeItem(this.TOKEN_KEY);
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(${this.API_URL}/login, { username, password })
      .pipe(
        tap(response => this.handleAuthSuccess(response))
      );
  }

  register(username: string, password: string, role: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(${this.API_URL}/register, { username, password, role })
      .pipe(
        tap(response => this.handleAuthSuccess(response))
      );
  }

  private handleAuthSuccess(response: AuthResponse) {
    // 1. Guarda SOMENTE o token no localStorage
    this.token.set(response.token);
    localStorage.setItem(this.TOKEN_KEY, response.token);

    // 2. Define a role temporariamente em memória para os Guards
    this.role.set(response.user.role);

    // 3. Hidrata os dados confidenciais diretamente em memória via Signals
    this.userStore.hydrateProfile(response.user);
  }
}
