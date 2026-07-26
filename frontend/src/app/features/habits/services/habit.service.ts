import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { CreateHabitRequest, ExecuteHabitResponse, HabitDifficulty, HabitResponse, HabitType, LogStatus } from '../../../core/models/habit.model';

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  // Mock data
  private habits: HabitResponse[] = [
    {
      id: '1',
      title: 'Beber 2L de Água',
      description: 'Manter a hidratação diária',
      type: HabitType.GOOD,
      difficulty: HabitDifficulty.EASY,
      isActive: true
    },
    {
      id: '2',
      title: 'Comer Fast Food',
      description: 'Evitar comer besteiras',
      type: HabitType.BAD,
      difficulty: HabitDifficulty.HARD,
      isActive: true
    },
    {
      id: '3',
      title: 'Estudar Programação (1h)',
      description: 'Foco no Angular e Ionic',
      type: HabitType.GOOD,
      difficulty: HabitDifficulty.MEDIUM,
      isActive: true
    }
  ];

  getHabits(): Observable<HabitResponse[]> {
    return of([...this.habits]).pipe(delay(800)); // Simulate network
  }

  createHabit(request: CreateHabitRequest): Observable<HabitResponse> {
    const newHabit: HabitResponse = {
      id: Math.random().toString(36).substr(2, 9),
      ...request,
      description: request.description || '',
      isActive: true
    };
    this.habits.push(newHabit);
    return of(newHabit).pipe(delay(800));
  }

  executeHabit(habitId: string, currentXp: number, currentCoins: number, currentDebuff: number): Observable<ExecuteHabitResponse> {
    const habit = this.habits.find(h => h.id === habitId);
    if (!habit) throw new Error('Habit not found');

    let xpRewarded = 0;
    let coinsRewarded = 0;
    let newDebuff = currentDebuff;

    // Lógica básica mockada para calcular recompensas
    if (habit.type === HabitType.GOOD) {
      let baseReward = 10;
      if (habit.difficulty === HabitDifficulty.MEDIUM) baseReward = 20;
      if (habit.difficulty === HabitDifficulty.HARD) baseReward = 30;

      xpRewarded = currentDebuff > 0 ? baseReward / 2 : baseReward; // Penalidade de 50%
      coinsRewarded = baseReward;

      if (newDebuff > 0) newDebuff--;
    } else {
      // Hábito ruim aplica debuff (penalidade para os próximos 10)
      newDebuff = 10;
    }

    const response: ExecuteHabitResponse = {
      logId: Math.random().toString(36).substr(2, 9),
      status: LogStatus.COMPLETED,
      xpRewarded,
      coinsRewarded,
      newTotalXp: currentXp + xpRewarded,
      newTotalCoins: currentCoins + coinsRewarded,
      currentDebuffCounter: newDebuff
    };

    return of(response).pipe(delay(1000));
  }
}
