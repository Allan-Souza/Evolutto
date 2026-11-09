import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Mission, MissionRequest, MissionType } from '../../../../core/models/mission.model';
import { HabitResponse } from '../../../../core/models/habit.model';

@Component({
  selector: 'app-mission-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mission-form-modal.component.html',
  styleUrls: ['./mission-form-modal.component.css']
})
export class MissionFormModalComponent implements OnInit {
  @Input() editData: Mission | null = null;
  @Input() availableHabits: HabitResponse[] = [];
  @Input() targetId?: string;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<MissionRequest>();

  missionForm: FormGroup;
  selectedHabitIds: string[] = [];
  MissionType = MissionType;

  constructor(private fb: FormBuilder) {
    this.missionForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(80)]],
      description: ['', [Validators.maxLength(200)]],
      type: [MissionType.DAILY, Validators.required],
      totalSteps: [3, [Validators.required, Validators.min(1)]],
      xpReward: [100, [Validators.required, Validators.min(1)]],
      coinReward: [50, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    if (this.editData) {
      this.missionForm.patchValue({
        title: this.editData.title,
        description: this.editData.description || '',
        type: this.editData.type,
        totalSteps: this.editData.totalSteps,
        xpReward: this.editData.xpReward,
        coinReward: this.editData.coinReward
      });
      this.selectedHabitIds = [...(this.editData.relatedHabitIds || [])];
    }
  }

  toggleHabit(habitId: string): void {
    const idx = this.selectedHabitIds.indexOf(habitId);
    if (idx >= 0) {
      this.selectedHabitIds.splice(idx, 1);
    } else {
      this.selectedHabitIds.push(habitId);
    }
  }

  isHabitSelected(habitId: string): boolean {
    return this.selectedHabitIds.includes(habitId);
  }

  clearHabitSelection(): void {
    this.selectedHabitIds = [];
  }

  onSubmit(): void {
    if (this.missionForm.valid) {
      const request: MissionRequest = {
        ...this.missionForm.value,
        relatedHabitIds: [...this.selectedHabitIds],
        ...(this.targetId ? { targetId: this.targetId } : {})
      };
      this.saveEvent.emit(request);
    } else {
      this.missionForm.markAllAsTouched();
    }
  }

  onClose(): void {
    this.closeEvent.emit();
  }
}

