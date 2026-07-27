import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitResponse, HabitType } from '../../../../core/models/habit.model';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-habit-card',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './habit-card.component.html',
  styleUrls: ['./habit-card.component.css']
})
export class HabitCardComponent {
  @Input() habit!: HabitResponse;
  @Input() isLoading = false;
  
  @Output() execute = new EventEmitter<string>();
  @Output() edit = new EventEmitter<HabitResponse>();
  @Output() delete = new EventEmitter<string>();
  
  HabitType = HabitType;
}
