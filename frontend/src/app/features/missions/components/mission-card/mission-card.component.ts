import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';
import { Mission, MissionType, MissionStatus } from '../../../../core/models/mission.model';

@Component({
  selector: 'app-mission-card',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.css']
})
export class MissionCardComponent {
  @Input({ required: true }) mission!: Mission;
  @Input() isClaimLoading = false;
  @Output() claim = new EventEmitter<string>();

  get progressPercent(): number {
    return Math.min((this.mission.currentSteps / this.mission.totalSteps) * 100, 100);
  }

  get typeBadgeClass(): string {
    switch (this.mission.type) {
      case MissionType.DAILY: return 'badge-daily';
      case MissionType.WEEKLY: return 'badge-weekly';
      case MissionType.MONTHLY: return 'badge-monthly';
    }
  }

  get typeLabel(): string {
    switch (this.mission.type) {
      case MissionType.DAILY: return 'Diária';
      case MissionType.WEEKLY: return 'Semanal';
      case MissionType.MONTHLY: return 'Mensal';
    }
  }

  get isClaimed(): boolean {
    return this.mission.status === MissionStatus.CLAIMED;
  }

  get isCompleted(): boolean {
    return this.mission.status === MissionStatus.COMPLETED;
  }

  onClaim() {
    this.claim.emit(this.mission.id);
  }
}
