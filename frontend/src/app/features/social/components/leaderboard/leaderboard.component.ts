import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardPosition } from '../../../../core/models/social.model';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
  @Input() ranking: LeaderboardPosition[] = [];
  @Input() currentUserId: string = 'u1'; // Simulando o ID do usuário atual logado
}
