import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HabitLogResponse {
  id: string;
  habitTitle: string;
  executedAt: string;
  status: string;
  xpRewarded: number;
  coinsRewarded: number;
}

export interface AdventurerSummaryResponse {
  id: string;
  username: string;
  avatar: string;
  currentXp: number;
  currentCoins: number;
  level: number;
  debuffCounter: number;
  totalHabitsCompleted: number;
}

@Injectable({
  providedIn: 'root'
})
export class ParentalService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/v1/parental';

  linkAdventurer(username: string): Observable<AdventurerSummaryResponse> {
    return this.http.post<AdventurerSummaryResponse>(`${this.API_URL}/link`, { username });
  }

  getMyAdventurers(): Observable<AdventurerSummaryResponse[]> {
    return this.http.get<AdventurerSummaryResponse[]>(`${this.API_URL}/adventurers`);
  }

  pardonDebuff(adventurerId: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/adventurer/${adventurerId}/pardon`, {});
  }

  getAdventurerLogs(adventurerId: string): Observable<HabitLogResponse[]> {
    return this.http.get<HabitLogResponse[]>(`${this.API_URL}/adventurer/${adventurerId}/logs`);
  }
  reviewHabit(logId: string, approved: boolean): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/review/${logId}?approved=${approved}`, {});
  }
}