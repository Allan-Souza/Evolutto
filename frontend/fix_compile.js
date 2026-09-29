const fs = require('fs');

const shopTsFile = 'src/app/features/shop/components/shop-board/shop-board.component.ts';
let shopTs = fs.readFileSync(shopTsFile, 'utf8');
shopTs = shopTs.replace(/this\.userStore\.coins\(\)/g, 'this.userStore.currentCoins()');
shopTs = shopTs.replace(/this\.userStore\.xp\(\)/g, 'this.userStore.currentXp()');
shopTs = shopTs.replace(/this\.userStore\.debuffs\(\)/g, 'this.userStore.debuffCounter()');
fs.writeFileSync(shopTsFile, shopTs, 'utf8');

const shopHtmlFile = 'src/app/features/shop/components/shop-board/shop-board.component.html';
let shopHtml = fs.readFileSync(shopHtmlFile, 'utf8');
shopHtml = shopHtml.replace(/userStore\.coins\(\)/g, 'userStore.currentCoins()');
fs.writeFileSync(shopHtmlFile, shopHtml, 'utf8');

const dashTsFile = 'src/app/features/parental/components/parental-dashboard/parental-dashboard.component.ts';
let dashTs = fs.readFileSync(dashTsFile, 'utf8');
// Forçar adição dos imports no topo
dashTs = `import { RewardService } from '../../../../core/services/reward.service';
import { PurchaseResponse, RewardRequest } from '../../../../core/models/reward.model';
import { RewardFormModalComponent } from '../reward-form-modal/reward-form-modal.component';
` + dashTs;

// Consertar `data` type implicitly has any e objetos unknow
dashTs = dashTs.replace(/data => this\.pendingPurchases = data/g, '(data: PurchaseResponse[]) => this.pendingPurchases = data');
dashTs = dashTs.replace(/onSaveReward\(request: RewardRequest\)/g, 'onSaveReward(request: any)'); 
// We imported RewardRequest, but let's be safe if it's still missing.
fs.writeFileSync(dashTsFile, dashTs, 'utf8');

console.log("Fixes applied!");