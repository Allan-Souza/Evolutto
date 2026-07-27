import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateHabitRequest, HabitType, HabitDifficulty, HabitResponse } from '../../../../core/models/habit.model';

@Component({
  selector: 'app-habit-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './habit-form-modal.component.html',
  styleUrls: ['./habit-form-modal.component.css']
})
export class HabitFormModalComponent implements OnInit {
  @Input() editData?: HabitResponse | null = null;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<CreateHabitRequest>();

  habitForm: FormGroup;
  habitTypes = Object.values(HabitType);
  habitDifficulties = Object.values(HabitDifficulty);

  constructor(private fb: FormBuilder) {
    this.habitForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', Validators.maxLength(100)],
      type: [HabitType.GOOD, Validators.required],
      difficulty: [HabitDifficulty.MEDIUM, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.editData) {
      this.habitForm.patchValue({
        title: this.editData.title,
        description: this.editData.description,
        type: this.editData.type,
        difficulty: this.editData.difficulty
      });
    }
  }

  onSubmit() {
    if (this.habitForm.valid) {
      this.saveEvent.emit(this.habitForm.value as CreateHabitRequest);
    } else {
      this.habitForm.markAllAsTouched();
    }
  }

  onClose() {
    this.closeEvent.emit();
  }
}
