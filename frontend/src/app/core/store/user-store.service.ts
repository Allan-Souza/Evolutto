import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserStoreService {
  // Estado reativo (Signals)
  readonly currentXp = signal<number>(0);
  readonly currentCoins = signal<number>(0);
  readonly currentLevel = signal<number>(1);
  readonly debuffCounter = signal<number>(0);

  // Computed Values (Derivados do estado atual)
  readonly isDebuffed = computed(() => this.debuffCounter() > 0);
  readonly xpToNextLevel = computed(() => this.currentLevel() * 1000 - this.currentXp());

  // Ações para atualizar o estado
  updateProgress(newXp: number, newCoins: number, debuff: number) {
    this.currentXp.set(newXp);
    this.currentCoins.set(newCoins);
    this.debuffCounter.set(debuff);
  }

  spendCoins(cost: number) {
    this.currentCoins.update(coins => coins - cost);
  }
}
