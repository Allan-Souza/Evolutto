import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClaimMissionResponse, Mission, MissionRequest } from '../../../core/models/mission.model';

@Injectable({ providedIn: 'root' })
export class MissionService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/v1/missions';

  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.API_URL}/me`);
  }

  createMission(request: MissionRequest): Observable<Mission> {
    return this.http.post<Mission>(this.API_URL, request);
  }

  updateMission(id: string, request: MissionRequest): Observable<Mission> {
    return this.http.put<Mission>(`${this.API_URL}/${id}`, request);
  }

  deleteMission(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  claimReward(missionId: string): Observable<ClaimMissionResponse> {
    return this.http.post<ClaimMissionResponse>(`${this.API_URL}/${missionId}/claim`, {});
  }
}
