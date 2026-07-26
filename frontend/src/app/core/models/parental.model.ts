export interface PendingApproval {
  id: string;
  childId: string;
  childName: string;
  habitId: string;
  habitTitle: string;
  difficulty: string;
  completedAt: string;
}

export interface ApproveHabitRequest {
  habitId: string;
  childId: string;
  approved: boolean;
}
