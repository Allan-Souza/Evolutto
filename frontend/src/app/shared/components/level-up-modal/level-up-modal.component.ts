import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-level-up-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" *ngIf="show" (click)="close()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        
        <div class="confetti-container">
          <div class="confetti" *ngFor="let i of [1,2,3,4,5,6,7,8,9,10,11,12]"></div>
        </div>

        <div class="level-up-badge">
          <span>Lvl</span>
          <span class="level-number">{{ newLevel }}</span>
        </div>
        
        <h2>Level Up!</h2>
        <p>Incrível! Você alcançou um novo nível de poder. Continue completando missões para ficar ainda mais forte!</p>
        
        <button class="btn-primary" (click)="close()">Incrível!</button>
      </div>
    </div>
  `,
  styleUrls: ['./level-up-modal.component.css']
})
export class LevelUpModalComponent {
  @Input() show = false;
  @Input() newLevel = 1;
  @Output() closeEvent = new EventEmitter<void>();

  close() {
    this.closeEvent.emit();
  }
}
