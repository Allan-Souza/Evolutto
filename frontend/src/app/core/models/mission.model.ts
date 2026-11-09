export enum MissionType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY'
}

export enum MissionStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CLAIMED = 'CLAIMED'
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: MissionType;
  currentSteps: number;
  totalSteps: number;
  xpReward: number;
  coinReward: number;
  status: MissionStatus;
  relatedHabitIds: string[];
  targetId?: string;
}

export interface MissionRequest {
  title: string;
  description: string;
  type: MissionType;
  totalSteps: number;
  xpReward: number;
  coinReward: number;
  relatedHabitIds: string[];
  targetId?: string;
}

export interface ClaimMissionResponse {
  missionId: string;
  xpRewarded: number;
  coinsRewarded: number;
  newTotalXp: number;
  newTotalCoins: number;
  newLevel: number;
  currentDebuffCounter: number;
}
