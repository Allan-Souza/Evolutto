import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateHabitRequest, ExecuteHabitResponse, HabitResponse } from '../../../core/models/habit.model';

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/v1/habits';

  getHabits(): Observable<HabitResponse[]> {
    return this.http.get<HabitResponse[]>(this.API_URL);
  }

  createHabit(request: CreateHabitRequest): Observable<HabitResponse> {
    return this.http.post<HabitResponse>(this.API_URL, request);
  }

  updateHabit(id: string, request: CreateHabitRequest): Observable<HabitResponse> {
    return this.http.put<HabitResponse>(`${this.API_URL}/${id}`, request);
  }

  deleteHabit(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  executeHabit(habitId: string): Observable<ExecuteHabitResponse> {
    return this.http.post<ExecuteHabitResponse>(`${this.API_URL}/${habitId}/execute`, {});
  }
}