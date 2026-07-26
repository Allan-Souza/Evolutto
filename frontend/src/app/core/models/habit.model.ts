export enum HabitType { GOOD = 'GOOD', BAD = 'BAD' }
export enum HabitDifficulty { EASY = 'EASY', MEDIUM = 'MEDIUM', HARD = 'HARD' }
export enum LogStatus { COMPLETED = 'COMPLETED', PENDING_APPROVAL = 'PENDING_APPROVAL', REJECTED = 'REJECTED' }

export interface CreateHabitRequest {
  title: string;
  description?: string;
  type: HabitType;
  difficulty: HabitDifficulty;
}

export interface HabitResponse {
  id: string;
  title: string;
  description: string;
  type: HabitType;
  difficulty: HabitDifficulty;
  isActive: boolean;
}

export interface ExecuteHabitResponse {
  logId: string;
  status: LogStatus;
  xpRewarded: number;
  coinsRewarded: number;
  newTotalXp: number;
  newTotalCoins: number;
  currentDebuffCounter: number;
}
