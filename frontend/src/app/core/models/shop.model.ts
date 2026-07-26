export enum ShopStatus { ACTIVE = 'ACTIVE', FROZEN = 'FROZEN' }

export interface RewardItem {
  id: string;
  title: string;
  cost: number;
}

export interface CreateRewardRequest {
  title: string;
  cost: number;
}

export interface ShopResponse {
  status: ShopStatus;
  availableRewards: RewardItem[];
}

export interface BuyRewardResponse {
  success: boolean;
  newCoinBalance: number;
  message: string;
}
