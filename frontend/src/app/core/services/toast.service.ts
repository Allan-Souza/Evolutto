import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'danger';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<ToastMessage[]>([]);

  show(message: string, type: 'success' | 'info' | 'warning' | 'danger' = 'info', durationMs = 3000) {
    const id = Math.random().toString(36).substr(2, 9);
    this.toasts.update(t => [...t, { id, message, type }]);

    setTimeout(() => this.remove(id), durationMs);
  }

  remove(id: string) {
    this.toasts.update(t => t.filter(toast => toast.id !== id));
  }
}
