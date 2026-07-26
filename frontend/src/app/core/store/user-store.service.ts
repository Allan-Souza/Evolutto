import { Injectable, signal, computed } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserStoreService {
  // Estado reativo (Signals)
  readonly currentXp = signal<number>(0);
  readonly currentCoins = signal<number>(0);
  readonly currentLevel = signal<number>(1);
  readonly debuffCounter = signal<number>(0);

  // Evento emitido quando o usuário sobe de nível
  public readonly levelUp$ = new Subject<number>();

  // Computed Values (Derivados do estado atual)
  readonly isDebuffed = computed(() => this.debuffCounter() > 0);
  readonly xpToNextLevel = computed(() => this.currentLevel() * 1000 - this.currentXp());

  // Ações para atualizar o estado
  updateProgress(newXpTotal: number, newCoinsTotal: number, debuff: number) {
    // Calcular quanto XP foi ganho nesta chamada
    const addedXp = newXpTotal - this.currentXp();
    
    this.currentCoins.set(newCoinsTotal);
    this.debuffCounter.set(debuff);

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
}
