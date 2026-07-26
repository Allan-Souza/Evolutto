import { Injectable, signal, computed } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserStoreService {
  // Estado reativo (Signals)
  readonly currentXp = signal<number>(0);
  readonly currentCoins = signal<number>(0);
  readonly currentLevel = signal<number>(1);
  readonly debuffCounter = signal<number>(0);
  
  // Perfil
  readonly username = signal<string>('Aventureiro');
  readonly avatar = signal<string>('lucideUser');
  readonly totalHabitsCompleted = signal<number>(0);

  // Evento emitido quando o usuário sobe de nível
  public readonly levelUp$ = new Subject<number>();
  // Evento emitido quando um debuff é removido
  public readonly debuffCleared$ = new Subject<void>();

  // Computed Values (Derivados do estado atual)
  readonly isDebuffed = computed(() => this.debuffCounter() > 0);
  readonly xpToNextLevel = computed(() => this.currentLevel() * 1000 - this.currentXp());

  // Ações para atualizar o estado
  updateProgress(newXpTotal: number, newCoinsTotal: number, debuff: number) {
    // Calcular quanto XP foi ganho nesta chamada
    const addedXp = newXpTotal - this.currentXp();
    const wasDebuffed = this.isDebuffed();

    if (addedXp > 0) {
      this.totalHabitsCompleted.update(t => t + 1);
    }
    
    this.currentCoins.set(newCoinsTotal);
    this.debuffCounter.set(debuff);

    if (wasDebuffed && !this.isDebuffed()) {
      this.debuffCleared$.next();
    }

    let nextXp = this.currentXp() + addedXp;
    let target = this.currentLevel() * 1000;

    // Lógica de Subir de Nível
    if (nextXp >= target) {
      this.currentLevel.update(l => l + 1);
      this.currentXp.set(nextXp - target);
      this.levelUp$.next(this.currentLevel());
    } else {
      this.currentXp.set(nextXp);
    }
  }

  spendCoins(cost: number) {
    this.currentCoins.update(coins => coins - cost);
  }

  updateProfile(name: string, icon: string) {
    this.username.set(name);
    this.avatar.set(icon);
  }
}
