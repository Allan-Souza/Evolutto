export interface CreateGroupRequest {
  name: string;
  description?: string;
  isPrivate: boolean;
}

export interface LeaderboardPosition {
  position: number;
  userId: string;
  username: string;
  periodXp: number;
}

export interface LeaderboardResponse {
  groupId: string;
  groupName: string;
  ranking: LeaderboardPosition[];
}
