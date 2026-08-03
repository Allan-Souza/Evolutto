import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './core/auth/jwt.interceptor';
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),
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
};
