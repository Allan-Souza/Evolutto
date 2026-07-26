import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitResponse, HabitType } from '../../../../core/models/habit.model';

@Component({
  selector: 'app-habit-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './habit-card.component.html',
  styleUrls: ['./habit-card.component.css']
})
export class HabitCardComponent {
  @Input() habit!: HabitResponse;
  @Output() execute = new EventEmitter<string>();
  @Input() isLoading = false;
  
  HabitType = HabitType;
}
