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
}
