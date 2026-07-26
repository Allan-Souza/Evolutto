import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { PendingApproval, ApproveHabitRequest } from '../../../core/models/parental.model';

@Injectable({
  providedIn: 'root'
})
export class ParentalService {
  private mockApprovals: PendingApproval[] = [
    {
      id: 'app1',
      childId: 'c1',
      childName: 'Alex',
      habitId: 'h1',
      habitTitle: 'Lavar a Louça',
      difficulty: 'MEDIUM',
      completedAt: new Date().toISOString()
    },
    {
      id: 'app2',
      childId: 'c1',
      childName: 'Alex',
      habitId: 'h2',
      habitTitle: 'Limpar o Quarto',
      difficulty: 'HARD',
      completedAt: new Date().toISOString()
    }
  ];

  getPendingApprovals(): Observable<PendingApproval[]> {
    return of([...this.mockApprovals]).pipe(delay(600));
  }

  approveHabit(request: ApproveHabitRequest): Observable<{ success: boolean }> {
    this.mockApprovals = this.mockApprovals.filter(a => a.habitId !== request.habitId);
    return of({ success: true }).pipe(delay(500));
  }
}
