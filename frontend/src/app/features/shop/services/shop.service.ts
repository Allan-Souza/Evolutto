import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { BuyRewardResponse, CreateRewardRequest, RewardItem, ShopResponse, ShopStatus } from '../../../core/models/shop.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  // Mock data
  private rewards: RewardItem[] = [
    { id: '1', title: '1 Hora de Videogame', cost: 50 },
    { id: '2', title: 'Pedir um Ifood (Lanche)', cost: 200 },
    { id: '3', title: 'Comprar Skin no Jogo', cost: 500 }
  ];

  getShop(): Observable<ShopResponse> {
    return of({
      status: ShopStatus.ACTIVE,
      availableRewards: [...this.rewards]
    }).pipe(delay(800));
  }

  createReward(request: CreateRewardRequest): Observable<RewardItem> {
    const newReward: RewardItem = {
      id: Math.random().toString(36).substr(2, 9),
      ...request
    };
    this.rewards.push(newReward);
    return of(newReward).pipe(delay(800));
  }

  buyReward(rewardId: string, currentCoins: number): Observable<BuyRewardResponse> {
    const reward = this.rewards.find(r => r.id === rewardId);
    if (!reward) throw new Error('Reward not found');

    if (currentCoins >= reward.cost) {
      return of({
        success: true,
        newCoinBalance: currentCoins - reward.cost,
        message: 'Recompensa resgatada com sucesso!'
      }).pipe(delay(800));
    } else {
      return of({
        success: false,
        newCoinBalance: currentCoins,
        message: 'Saldo insuficiente!'
      }).pipe(delay(500));
    }
  }
}
