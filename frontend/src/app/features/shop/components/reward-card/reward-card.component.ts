import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardItem } from '../../../../core/models/shop.model';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-reward-card',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './reward-card.component.html',
  styleUrls: ['./reward-card.component.css']
})
export class RewardCardComponent {
  @Input() reward!: RewardItem;
  @Input() canAfford = false;
  @Input() isLoading = false;
  
  @Output() buy = new EventEmitter<string>();
  @Output() edit = new EventEmitter<RewardItem>();
  @Output() delete = new EventEmitter<string>();
}
