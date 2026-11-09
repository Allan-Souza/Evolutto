import { applicationConfig, type Preview } from '@storybook/angular-vite';
import { provideIcons } from '@ng-icons/core';
import {
  lucideListTodo,
  lucideShoppingBag,
  lucideTrophy,
  lucideShield,
  lucideCheckCircle2,
  lucideXCircle,
  lucideCoins,
  lucideSnowflake,
  lucideUser,
  lucideSwords,
  lucideWand,
  lucideCrown,
  lucideFlame,
  lucideGhost,
  lucideRocket,
  lucideEdit2,
  lucideTrash2,
  lucideTarget
} from '@ng-icons/lucide';
import '../src/styles.css';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        provideIcons({
          lucideListTodo,
          lucideShoppingBag,
          lucideTrophy,
          lucideShield,
          lucideCheckCircle2,
          lucideXCircle,
          lucideCoins,
          lucideSnowflake,
          lucideUser,
          lucideSwords,
          lucideWand,
          lucideCrown,
          lucideFlame,
          lucideGhost,
          lucideRocket,
          lucideEdit2,
          lucideTrash2,
          lucideTarget
        })
      ]
    })
  ],
  parameters: {
    backgrounds: {
      default: 'evolutto-dark',
      values: [
        { name: 'evolutto-dark', value: '#0b0f19' }
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
