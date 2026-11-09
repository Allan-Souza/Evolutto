import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';
import { MissionService } from '../../services/mission.service';
import { MissionCardComponent } from '../mission-card/mission-card.component';
import { MissionFormModalComponent } from '../mission-form-modal/mission-form-modal.component';
import { Mission, MissionRequest, MissionType } from '../../../../core/models/mission.model';
import { HabitResponse, HabitType } from '../../../../core/models/habit.model';
import { HabitService } from '../../../habits/services/habit.service';
import { UserStoreService } from '../../../../core/store/user-store.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-mission-board',
  standalone: true,
  imports: [CommonModule, NgIconComponent, MissionCardComponent, MissionFormModalComponent, ConfirmModalComponent],
  templateUrl: './mission-board.component.html',
  styleUrls: ['./mission-board.component.css']
})
export class MissionBoardComponent implements OnInit {
  private missionService = inject(MissionService);
  private habitService = inject(HabitService);
  private userStore = inject(UserStoreService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  missions: Mission[] = [];
  goodHabits: HabitResponse[] = [];
  isLoading = true;
  claimingId: string | null = null;

  showModal = false;
  missionToEdit: Mission | null = null;
  showConfirmModal = false;
  itemToDelete: string | null = null;

  get isSolo(): boolean {
    return this.authService.hasRole('SOLO');
  }

  ngOnInit() {
    this.loadMissions();
    if (this.isSolo) {
      this.habitService.getHabits().subscribe({
        next: (habits) => {
          this.goodHabits = habits.filter(h => h.type === HabitType.GOOD);
        }
      });
    }
  }

  loadMissions() {
    this.isLoading = true;
    this.missionService.getMissions().subscribe({
      next: (data) => {
        this.missions = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  get dailyMissions(): Mission[] {
    return this.missions.filter(m => m.type === MissionType.DAILY);
  }

  get weeklyMissions(): Mission[] {
    return this.missions.filter(m => m.type === MissionType.WEEKLY);
  }

  get monthlyMissions(): Mission[] {
    return this.missions.filter(m => m.type === MissionType.MONTHLY);
  }

  openModal(mission?: Mission) {
    this.missionToEdit = mission ?? null;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.missionToEdit = null;
  }

  onSaveMission(request: MissionRequest) {
    if (this.missionToEdit) {
      this.missionService.updateMission(this.missionToEdit.id, request).subscribe({
        next: (updated) => {
          const index = this.missions.findIndex(m => m.id === updated.id);
          if (index !== -1) {
            this.missions[index] = updated;
          }
          this.closeModal();
          this.toastService.show('Missão atualizada com sucesso!', 'info');
        },
        error: () => this.toastService.show('Erro ao atualizar missão.', 'danger')
      });
    } else {
      this.missionService.createMission(request).subscribe({
        next: (created) => {
          this.missions = [...this.missions, created];
          this.closeModal();
          this.toastService.show('Missão criada com sucesso! 🎯', 'success');
        },
        error: () => this.toastService.show('Erro ao criar missão.', 'danger')
      });
    }
  }

  onDeleteMission(missionId: string) {
    this.itemToDelete = missionId;
    this.showConfirmModal = true;
  }

  onConfirmDelete() {
    if (!this.itemToDelete) return;
    const id = this.itemToDelete;
    this.missionService.deleteMission(id).subscribe({
      next: () => {
        this.missions = this.missions.filter(m => m.id !== id);
        this.toastService.show('Missão excluída.', 'warning');
        this.showConfirmModal = false;
        this.itemToDelete = null;
      },
      error: () => {
        this.toastService.show('Erro ao excluir missão.', 'danger');
        this.showConfirmModal = false;
        this.itemToDelete = null;
      }
    });
  }

  onCancelDelete() {
    this.showConfirmModal = false;
    this.itemToDelete = null;
  }

  onClaim(missionId: string) {
    this.claimingId = missionId;
    this.missionService.claimReward(missionId).subscribe({
      next: (res) => {
        this.claimingId = null;
        const previousLevel = this.userStore.currentLevel();
        this.userStore.currentXp.set(res.newTotalXp);
        this.userStore.currentCoins.set(res.newTotalCoins);
        this.userStore.currentLevel.set(res.newLevel);
        this.userStore.debuffCounter.set(res.currentDebuffCounter);

        if (res.newLevel > previousLevel) {
          this.userStore.levelUp$.next(res.newLevel);
        }

        this.toastService.show(`🎉 Missão resgatada! +${res.xpRewarded} XP, +${res.coinsRewarded} moedas`, 'success');
        this.loadMissions();
      },
      error: () => {
        this.claimingId = null;
        this.toastService.show('Erro ao resgatar recompensa da missão.', 'danger');
      }
    });
  }
}
