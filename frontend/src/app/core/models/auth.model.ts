export interface UserProfile {
  id: string;
  username: string;
  role: string;
  avatar: string;
  currentXp: number;
  currentCoins: number;
  level: number;
  debuffCounter: number;
  shopStatus: string;
  totalHabitsCompleted: number;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}
