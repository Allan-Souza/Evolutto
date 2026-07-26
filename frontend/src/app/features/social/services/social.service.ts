import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { LeaderboardResponse, LeaderboardPosition } from '../../../core/models/social.model';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  private mockRanking: LeaderboardPosition[] = [
    { position: 1, userId: 'u2', username: 'Alex', periodXp: 4500 },
    { position: 2, userId: 'u1', username: 'Você', periodXp: 3200 },
    { position: 3, userId: 'u3', username: 'João', periodXp: 2100 },
    { position: 4, userId: 'u4', username: 'Maria', periodXp: 1800 }
  ];

  getLeaderboard(groupId: string): Observable<LeaderboardResponse> {
    return of({
      groupId,
      groupName: 'Amigos da Facul',
      ranking: [...this.mockRanking]
    }).pipe(delay(800));
  }
}
