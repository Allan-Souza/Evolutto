const fs = require('fs');
const path = require('path');

const modelsDir = 'src/app/core/models';
const servicesDir = 'src/app/core/services';

if (!fs.existsSync(modelsDir)) fs.mkdirSync(modelsDir, { recursive: true });
if (!fs.existsSync(servicesDir)) fs.mkdirSync(servicesDir, { recursive: true });

const modelContent = `export enum PurchaseStatus {
  PENDING_DELIVERY = 'PENDING_DELIVERY',
  DELIVERED = 'DELIVERED'
}

export interface RewardRequest {
  title: string;
  description: string;
  cost: number;
  targetId: string;
}

export interface RewardResponse {
  id: string;
  title: string;
  description: string;
  cost: number;
  targetId: string;
}

export interface PurchaseResponse {
  id: string;
  rewardTitle: string;
  cost: number;
  adventurerId: string;
  adventurerUsername: string;
  status: PurchaseStatus;
  purchasedAt: string;
}
`;

const serviceContent = `import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RewardRequest, RewardResponse, PurchaseResponse } from '../models/reward.model';

@Injectable({ providedIn: 'root' })
export class RewardService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/v1/rewards';

  createReward(request: RewardRequest): Observable<RewardResponse> {
    return this.http.post<RewardResponse>(this.API_URL, request);
  }
  
  deleteReward(id: string): Observable<void> {
    return this.http.delete<void>(\`\${this.API_URL}/\${id}\`);
  }
  
  getPendingPurchases(): Observable<PurchaseResponse[]> {
    return this.http.get<PurchaseResponse[]>(\`\${this.API_URL}/pending\`);
  }
  
  deliverReward(purchaseId: string): Observable<void> {
    return this.http.post<void>(\`\${this.API_URL}/purchases/\${purchaseId}/deliver\`, {});
  }
  
  getMyRewards(): Observable<RewardResponse[]> {
    return this.http.get<RewardResponse[]>(\`\${this.API_URL}/me\`);
  }
  
  buyReward(rewardId: string): Observable<PurchaseResponse> {
    return this.http.post<PurchaseResponse>(\`\${this.API_URL}/\${rewardId}/buy\`, {});
  }
}
`;

fs.writeFileSync(path.join(modelsDir, 'reward.model.ts'), modelContent, 'utf8');
fs.writeFileSync(path.join(servicesDir, 'reward.service.ts'), serviceContent, 'utf8');
console.log("Services generated!");