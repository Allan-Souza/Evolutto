import type { Meta, StoryObj } from '@storybook/angular-vite';
import { HabitCardComponent } from '../app/features/habits/components/habit-card/habit-card.component';
import { HabitDifficulty, HabitType } from '../app/core/models/habit.model';

const meta: Meta<HabitCardComponent> = {
  title: 'Evolutto/Habits/HabitCard',
  component: HabitCardComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<HabitCardComponent>;

export const GoodHabitWithStreak: Story = {
  args: {
    habit: {
      id: 'h-1',
      title: 'Estudar Arquitetura Java & Angular',
      description: 'Dedicar 1 hora focada sem distrações',
      type: HabitType.GOOD,
      difficulty: HabitDifficulty.HARD,
      isActive: true,
      streak: 7,
    },
    isLoading: false,
  },
};

export const EasyGoodHabit: Story = {
  args: {
    habit: {
      id: 'h-2',
      title: 'Beber 2L de Água',
      description: 'Manter a garrafa por perto durante o dia',
      type: HabitType.GOOD,
      difficulty: HabitDifficulty.EASY,
      isActive: true,
      streak: 2,
    },
    isLoading: false,
  },
};

export const BadHabitPenalty: Story = {
  args: {
    habit: {
      id: 'h-3',
      title: 'Comer Fast Food na Semana',
      description: 'Evitar pedidos de delivery fora da dieta',
      type: HabitType.BAD,
      difficulty: HabitDifficulty.MEDIUM,
      isActive: true,
      streak: 0,
    },
    isLoading: false,
  },
};
