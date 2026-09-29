import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RewardRequest } from '../../../../core/models/reward.model';

@Component({
  selector: 'app-reward-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reward-form-modal.component.html',
  styleUrls: ['./reward-form-modal.component.css']
})
export class RewardFormModalComponent {
  @Input() show = false;
  @Input() adventurerId: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<RewardRequest>();

  request: RewardRequest = { title: '', description: '', cost: 50, targetId: '' };

  onClose() {
    this.close.emit();
  }

  onSave() {
    this.request.targetId = this.adventurerId;
    this.save.emit(this.request);
    this.request = { title: '', description: '', cost: 50, targetId: '' };
  }
}
