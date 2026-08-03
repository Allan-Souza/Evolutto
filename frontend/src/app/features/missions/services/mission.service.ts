import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Mission, MissionType, MissionStatus } from '../../../core/models/mission.model';

@Injectable({ providedIn: 'root' })
export class MissionService {

  private missions: Mission[] = [
    {
      id: 'm1',
      title: 'Hidratação em Dia',
      description: 'Beba 2L de água por 3 dias seguidos.',
      type: MissionType.DAILY,
      currentSteps: 0,
      totalSteps: 3,
      xpReward: 100,
      coinReward: 50,
      status: MissionStatus.ACTIVE,
      relatedHabitIds: ['1']
    },
    {
      id: 'm2',
      title: 'Mente Afiada',
      description: 'Estude programação 5 vezes esta semana.',
      type: MissionType.WEEKLY,
      currentSteps: 0,
      totalSteps: 5,
      xpReward: 300,
      coinReward: 150,
      status: MissionStatus.ACTIVE,
      relatedHabitIds: ['3']
    },
    {
      id: 'm3',
      title: 'Vida Saudável',
      description: 'Evite fast food durante 7 dias.',
      type: MissionType.WEEKLY,
      currentSteps: 0,
      totalSteps: 7,
      xpReward: 500,
      coinReward: 200,
      status: MissionStatus.ACTIVE,
      relatedHabitIds: ['2']
    },
    {
      id: 'm4',
      title: 'Mestre dos Hábitos',
      description: 'Complete qualquer hábito 30 vezes no mês.',
      type: MissionType.MONTHLY,
      currentSteps: 0,
      totalSteps: 30,
      xpReward: 1000,
      coinReward: 500,
      status: MissionStatus.ACTIVE,
      relatedHabitIds: ['1', '2', '3']
    }
  ];

  getMissions(): Observable<Mission[]> {
    return of([...this.missions.map(m => ({ ...m }))]).pipe(delay(600));
  }

  updateProgress(habitId: string): void {
    this.missions.forEach(m => {
      if (m.relatedHabitIds.includes(habitId) && m.status === MissionStatus.ACTIVE) {
        m.currentSteps = Math.min(m.currentSteps + 1, m.totalSteps);
        if (m.currentSteps >= m.totalSteps) {
          m.status = MissionStatus.COMPLETED;
        }
      }
    });
  }

  claimReward(missionId: string): Observable<{ xp: number; coins: number } | null> {
    const mission = this.missions.find(m => m.id === missionId);
    if (!mission || mission.status !== MissionStatus.COMPLETED) {
      return of(null).pipe(delay(300));
    }

    mission.status = MissionStatus.CLAIMED;
    return of({ xp: mission.xpReward, coins: mission.coinReward }).pipe(delay(600));
  }
}
