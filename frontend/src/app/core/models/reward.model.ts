export enum PurchaseStatus {
  PENDING_DELIVERY = 'PENDING_DELIVERY',
  DELIVERED = 'DELIVERED'
}

export interface RewardRequest {
  title: string;
  description: string;
  cost: number;
  targetId: string;
}

export interface RewardResponse {
  id: string;
  title: string;
  description: string;
  cost: number;
  targetId: string;
}

export interface PurchaseResponse {
  id: string;
  rewardTitle: string;
  cost: number;
  adventurerId: string;
  adventurerUsername: string;
  status: PurchaseStatus;
  purchasedAt: string;
}
