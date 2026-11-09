import type { Meta, StoryObj } from '@storybook/angular-vite';
import { MissionCardComponent } from '../app/features/missions/components/mission-card/mission-card.component';
import { MissionStatus, MissionType } from '../app/core/models/mission.model';

const meta: Meta<MissionCardComponent> = {
  title: 'Evolutto/Missions/MissionCard',
  component: MissionCardComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<MissionCardComponent>;

export const DailyActiveSolo: Story = {
  args: {
    mission: {
      id: 'm-1',
      title: 'Hidratação em Dia',
      description: 'Beba 2L de água por 3 dias seguidos.',
      type: MissionType.DAILY,
      currentSteps: 2,
      totalSteps: 3,
      xpReward: 100,
      coinReward: 50,
      status: MissionStatus.ACTIVE,
      relatedHabitIds: [],
    },
    canManage: true,
    isClaimLoading: false,
  },
};

export const WeeklyReadyToClaim: Story = {
  args: {
    mission: {
      id: 'm-2',
      title: 'Mente Afiada',
      description: 'Conclua 5 sessões de estudo nesta semana.',
      type: MissionType.WEEKLY,
      currentSteps: 5,
      totalSteps: 5,
      xpReward: 300,
      coinReward: 150,
      status: MissionStatus.COMPLETED,
      relatedHabitIds: [],
    },
    canManage: true,
    isClaimLoading: false,
  },
};

export const MonthlyClaimed: Story = {
  args: {
    mission: {
      id: 'm-3',
      title: 'Mestre da Consistência',
      description: 'Complete 30 hábitos bons ao longo do mês.',
      type: MissionType.MONTHLY,
      currentSteps: 30,
      totalSteps: 30,
      xpReward: 1000,
      coinReward: 500,
      status: MissionStatus.CLAIMED,
      relatedHabitIds: [],
    },
    canManage: false,
    isClaimLoading: false,
  },
};
