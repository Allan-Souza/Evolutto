import type { Meta, StoryObj } from '@storybook/angular-vite';
import { LevelUpModalComponent } from '../app/shared/components/level-up-modal/level-up-modal.component';

const meta: Meta<LevelUpModalComponent> = {
  title: 'Evolutto/Shared/LevelUpModal',
  component: LevelUpModalComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<LevelUpModalComponent>;

export const LevelUpCelebration: Story = {
  args: {
    show: true,
    newLevel: 5,
  },
};
