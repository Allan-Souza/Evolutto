import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialService } from '../../services/social.service';
import { LeaderboardResponse } from '../../../../core/models/social.model';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';

@Component({
  selector: 'app-group-dashboard',
  standalone: true,
  imports: [CommonModule, LeaderboardComponent],
  templateUrl: './group-dashboard.component.html',
  styleUrls: ['./group-dashboard.component.css']
})
export class GroupDashboardComponent implements OnInit {
  groupData: LeaderboardResponse | null = null;
  isLoading = true;
  
  private socialService = inject(SocialService);

  ngOnInit(): void {
    this.socialService.getLeaderboard('g1').subscribe({
      next: (data) => {
        this.groupData = data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }
}
