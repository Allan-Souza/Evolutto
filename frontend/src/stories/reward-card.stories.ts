import type { Meta, StoryObj } from '@storybook/angular-vite';
import { RewardCardComponent } from '../app/features/shop/components/reward-card/reward-card.component';

const meta: Meta<RewardCardComponent> = {
  title: 'Evolutto/Shop/RewardCard',
  component: RewardCardComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<RewardCardComponent>;

export const AffordableReward: Story = {
  args: {
    reward: {
      id: 'r-1',
      title: '1 Hora de Videogame Livre',
      cost: 50,
    },
    canAfford: true,
    isLoading: false,
  },
};

export const InsufficientCoinsReward: Story = {
  args: {
    reward: {
      id: 'r-2',
      title: 'Noite da Pizza / iFood',
      cost: 250,
    },
    canAfford: false,
    isLoading: false,
  },
};
