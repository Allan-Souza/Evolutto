import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div *ngFor="let toast of toastService.toasts()" 
           class="toast-message" 
           [ngClass]="toast.type">
        {{ toast.message }}
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 80px; /* Below the header */
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    }
    .toast-message {
      background: rgba(30, 41, 59, 0.95);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.1);
      padding: 12px 24px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      animation: slideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .toast-message.success { border-bottom: 3px solid #10b981; }
    .toast-message.info { border-bottom: 3px solid #3b82f6; }
    .toast-message.warning { border-bottom: 3px solid #f59e0b; }
    .toast-message.danger { border-bottom: 3px solid #ef4444; }

    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}
