import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RewardRequest, RewardResponse } from '../../../../core/models/reward.model';

@Component({
  selector: 'app-reward-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reward-form-modal.component.html',
  styleUrls: ['./reward-form-modal.component.css']
})
export class RewardFormModalComponent implements OnInit {
  @Input() editData?: RewardResponse | null = null;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<RewardRequest>();

  rewardForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.rewardForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(120)]],
      cost: [100, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    if (this.editData) {
      this.rewardForm.patchValue({
        title: this.editData.title,
        description: this.editData.description || '',
        cost: this.editData.cost
      });
    }
  }

  onSubmit() {
    if (this.rewardForm.valid) {
      this.saveEvent.emit(this.rewardForm.value as RewardRequest);
    } else {
      this.rewardForm.markAllAsTouched();
    }
  }

  onClose() {
    this.closeEvent.emit();
  }
}
