const fs = require('fs');
const path = require('path');

// 1. Atualizar o shop.routes.ts
const routesTs = `import { Routes } from '@angular/router';
import { ShopBoardComponent } from './components/shop-board/shop-board.component';

export const SHOP_ROUTES: Routes = [
  { path: '', component: ShopBoardComponent }
];
`;
fs.writeFileSync('src/app/features/shop/shop.routes.ts', routesTs, 'utf8');

// 2. Adicionar o Botão da Lojinha no header do Aventureiro (habit-list)
const habitHtmlFile = 'src/app/features/habits/components/habit-list/habit-list.component.html';
let habitHtml = fs.readFileSync(habitHtmlFile, 'utf8');

const storeBtnHtml = `
  <div style="display: flex; gap: 1rem; margin-top: 1rem;">
    <button class="btn-primary" (click)="openModal()">Nova Miss\\u00E3o</button>
    <a routerLink="/shop" class="btn-secondary" style="text-decoration: none; display: flex; align-items: center; justify-content: center; background: rgba(255,165,0,0.2); color: #ffa500; border-color: #ffa500;">
      \\uD83C\\uDFEA Ir para a Lojinha
    </a>
  </div>
</div>
`;

// Substitui o final do header para incluir o novo botão
habitHtml = habitHtml.replace(/<button class="btn-primary" \(click\)="openModal\(\)">Nova Miss.*?<\/button>\s*<\/div>/, storeBtnHtml);
// Adicionar routerLink module no habit-list.component.ts para funcionar a navegação
const habitTsFile = 'src/app/features/habits/components/habit-list/habit-list.component.ts';
let habitTs = fs.readFileSync(habitTsFile, 'utf8');
habitTs = habitTs.replace(`import { CommonModule } from '@angular/common';`, `import { CommonModule } from '@angular/common';\nimport { RouterModule } from '@angular/router';`);
habitTs = habitTs.replace(`imports: [CommonModule, HabitCardComponent`, `imports: [CommonModule, RouterModule, HabitCardComponent`);
fs.writeFileSync(habitTsFile, habitTs, 'utf8');

fs.writeFileSync(habitHtmlFile, habitHtml, 'utf8');
console.log("Navigations updated!");