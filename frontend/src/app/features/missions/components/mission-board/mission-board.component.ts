import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';
import { MissionService } from '../../services/mission.service';
import { MissionCardComponent } from '../mission-card/mission-card.component';
import { Mission, MissionType } from '../../../../core/models/mission.model';
import { UserStoreService } from '../../../../core/store/user-store.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-mission-board',
  standalone: true,
  imports: [CommonModule, NgIconComponent, MissionCardComponent],
  templateUrl: './mission-board.component.html',
  styleUrls: ['./mission-board.component.css']
})
export class MissionBoardComponent implements OnInit {
  private missionService = inject(MissionService);
  private userStore = inject(UserStoreService);
  private toastService = inject(ToastService);

  missions: Mission[] = [];
  isLoading = true;
  claimingId: string | null = null;

  ngOnInit() {
    this.loadMissions();
  }

  loadMissions() {
    this.isLoading = true;
    this.missionService.getMissions().subscribe(data => {
      this.missions = data;
      this.isLoading = false;
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

  onClaim(missionId: string) {
    this.claimingId = missionId;
    this.missionService.claimReward(missionId).subscribe(reward => {
      this.claimingId = null;
      if (reward) {
        // Creditar XP e Moedas no UserStore
        const currentXp = this.userStore.currentXp();
        const currentCoins = this.userStore.currentCoins();
        const currentDebuff = this.userStore.debuffCounter();
        this.userStore.updateProgress(currentXp + reward.xp, currentCoins + reward.coins, currentDebuff);

        this.toastService.show(`🎉 Missão resgatada! +${reward.xp} XP, +${reward.coins} moedas`, 'success');
        this.loadMissions(); // Refresh para pegar o status CLAIMED
      }
    });
  }
}
