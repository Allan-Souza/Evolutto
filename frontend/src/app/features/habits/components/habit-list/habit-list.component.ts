import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../../services/habit.service';
import { UserStoreService } from '../../../../core/store/user-store.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { HabitResponse, HabitType, CreateHabitRequest } from '../../../../core/models/habit.model';
import { HabitCardComponent } from '../habit-card/habit-card.component';
import { ToastService } from '../../../../core/services/toast.service';
import { HabitFormModalComponent } from '../habit-form-modal/habit-form-modal.component';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';
import { MissionService } from '../../../missions/services/mission.service';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [CommonModule, HabitCardComponent, HabitFormModalComponent, ConfirmModalComponent],
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.css']
})
export class HabitListComponent implements OnInit {
  habits: HabitResponse[] = [];
  loadingId: string | null = null;
  showModal = false;
  habitToEdit: HabitResponse | null = null;
  showConfirmModal = false;
  itemToDelete: string | null = null;
  
  private habitService = inject(HabitService);
  private userStore = inject(UserStoreService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private missionService = inject(MissionService);

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
      this.userStore.debuffCounter(),
      this.authService.currentRole()
    ).subscribe({
      next: (res) => {
        this.userStore.updateProgress(res.newTotalXp, res.newTotalCoins, res.currentDebuffCounter);
        
        const habit = this.habits.find(h => h.id === habitId);
        if (habit?.type === HabitType.GOOD) {
          this.toastService.show(`Você ganhou +${res.xpRewarded} XP!`, 'success');
          // Atualizar progresso das missões vinculadas a este hábito
          this.missionService.updateProgress(habitId);
        } else {
          if (this.authService.currentRole() === 'SOLO') {
            this.toastService.show(`Você perdeu 10 XP e 10 Moedas!`, 'danger');
          } else {
            this.toastService.show(`Debuff aplicado! Penalidade ativada.`, 'danger');
          }
        }

        this.loadingId = null;
      },
      error: () => this.loadingId = null
    });
  }

  openModal(habit?: HabitResponse) {
    if (habit) {
      this.habitToEdit = habit;
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.habitToEdit = null;
  }

  onSaveHabit(request: CreateHabitRequest) {
    if (this.habitToEdit) {
      this.habitService.updateHabit(this.habitToEdit.id, request).subscribe(updatedHabit => {
        const index = this.habits.findIndex(h => h.id === updatedHabit.id);
        if (index !== -1) {
          this.habits[index] = updatedHabit;
        }
        this.closeModal();
        this.toastService.show('Hábito atualizado!', 'info');
      });
    } else {
      this.habitService.createHabit(request).subscribe(newHabit => {
        this.habits = [...this.habits, newHabit];
        this.closeModal();
        this.toastService.show('Hábito criado!', 'success');
      });
    }
  }

  onDeleteHabit(id: string) {
    this.itemToDelete = id;
    this.showConfirmModal = true;
  }

  onConfirmDelete() {
    if (this.itemToDelete) {
      this.habitService.deleteHabit(this.itemToDelete).subscribe(() => {
        this.habits = this.habits.filter(h => h.id !== this.itemToDelete);
        this.toastService.show('Hábito excluído.', 'warning');
        this.showConfirmModal = false;
        this.itemToDelete = null;
      });
    }
  }

  onCancelDelete() {
    this.showConfirmModal = false;
    this.itemToDelete = null;
  }
}
