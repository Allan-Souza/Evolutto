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
      isActive: true,
      streak: 3
    },
    {
      id: '2',
      title: 'Comer Fast Food',
      description: 'Evitar comer besteiras',
      type: HabitType.BAD,
      difficulty: HabitDifficulty.HARD,
      isActive: true,
      streak: 0
    },
    {
      id: '3',
      title: 'Estudar Programação (1h)',
      description: 'Foco no Angular e Ionic',
      type: HabitType.GOOD,
      difficulty: HabitDifficulty.MEDIUM,
      isActive: true,
      streak: 0
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
      isActive: true,
      streak: 0
    };
    this.habits.push(newHabit);
    return of(newHabit).pipe(delay(800));
  }

  updateHabit(id: string, request: CreateHabitRequest): Observable<HabitResponse> {
    const index = this.habits.findIndex(h => h.id === id);
    if (index === -1) throw new Error('Habit not found');
    
    this.habits[index] = {
      ...this.habits[index],
      ...request,
      description: request.description || ''
    };
    return of(this.habits[index]).pipe(delay(500));
  }

  deleteHabit(id: string): Observable<void> {
    this.habits = this.habits.filter(h => h.id !== id);
    return of(void 0).pipe(delay(500));
  }

  executeHabit(habitId: string, currentXp: number, currentCoins: number, currentDebuff: number, role: string): Observable<ExecuteHabitResponse> {
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
      
      // Incrementa ofensiva apenas para efeitos visuais do MVP
      habit.streak += 1;
    } else {
      // Hábito ruim
      if (role === 'SOLO') {
        // Modo Leve: perde XP e Moedas, sem debuff prolongado
        xpRewarded = -10;
        coinsRewarded = -10;
      } else {
        // Aventureiro: aplica debuff (penalidade para os próximos 10 hábitos bons)
        newDebuff = 10;
      }
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
