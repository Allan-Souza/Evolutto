import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../../services/habit.service';
import { UserStoreService } from '../../../../core/store/user-store.service';
import { HabitResponse, HabitType } from '../../../../core/models/habit.model';
import { HabitCardComponent } from '../habit-card/habit-card.component';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [CommonModule, HabitCardComponent],
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.css']
})
export class HabitListComponent implements OnInit {
  habits: HabitResponse[] = [];
  loadingId: string | null = null;
  
  private habitService = inject(HabitService);
  private userStore = inject(UserStoreService);
  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.habitService.getHabits().subscribe(data => {
      this.habits = data;
    });
  }

  onExecute(habitId: string) {
    this.loadingId = habitId;
    this.habitService.executeHabit(
      habitId, 
      this.userStore.currentXp(), 
      this.userStore.currentCoins(), 
      this.userStore.debuffCounter()
    ).subscribe({
      next: (res) => {
        this.userStore.updateProgress(res.newTotalXp, res.newTotalCoins, res.currentDebuffCounter);
        
        const habit = this.habits.find(h => h.id === habitId);
        if (habit?.type === HabitType.GOOD) {
          this.toastService.show(`Você ganhou +${res.xpRewarded} XP!`, 'success');
        } else {
          this.toastService.show(`Debuff aplicado! Penalidade ativada.`, 'danger');
        }

        this.loadingId = null;
      },
      error: () => this.loadingId = null
    });
  }
}
