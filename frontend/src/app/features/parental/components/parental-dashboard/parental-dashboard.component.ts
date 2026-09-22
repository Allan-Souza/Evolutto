import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParentalService, AdventurerSummaryResponse, HabitLogResponse } from '../../services/parental.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-parental-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parental-dashboard.component.html',
  styleUrls: ['./parental-dashboard.component.css']
})
export class ParentalDashboardComponent implements OnInit {
  adventurers: AdventurerSummaryResponse[] = [];
  adventurerLogs: { [id: string]: HabitLogResponse[] } = {};
  expandedAdventurer: string | null = null;
  isLoading = true;
  linkUsername = '';

  private parentalService = inject(ParentalService);
  private toastService = inject(ToastService);

  ngOnInit() {
    this.loadAdventurers();
  }

  loadAdventurers() {
    this.isLoading = true;
    this.parentalService.getMyAdventurers().subscribe({
      next: (data) => {
        this.adventurers = data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  onLinkAdventurer() {
    if (!this.linkUsername.trim()) return;
    
    this.parentalService.linkAdventurer(this.linkUsername).subscribe({
      next: (data) => {
        this.adventurers.push(data);
        this.toastService.show(`Aventureiro ${data.username} vinculado!`, 'success');
        this.linkUsername = '';
      },
      error: () => {
        this.toastService.show('Erro ao vincular (UsuÃ¡rio nÃ£o encontrado)', 'danger');
      }
    });
  }

  onPardon(adventurerId: string) {
    this.parentalService.pardonDebuff(adventurerId).subscribe({
      next: () => {
        const adv = this.adventurers.find(a => a.id === adventurerId);
        if (adv) adv.debuffCounter = 0;
        this.toastService.show('Debuffs perdoados com sucesso!', 'success');
      },
      error: () => {
        this.toastService.show('Erro ao perdoar.', 'danger');
      }
    });
  }
  toggleLogs(adventurerId: string) {
    if (this.expandedAdventurer === adventurerId) {
      this.expandedAdventurer = null;
      return;
    }
    
    this.expandedAdventurer = adventurerId;
    if (!this.adventurerLogs[adventurerId]) {
      this.parentalService.getAdventurerLogs(adventurerId).subscribe({
        next: (logs) => {
          this.adventurerLogs[adventurerId] = logs;
        },
        error: () => {
          this.toastService.show('Erro ao carregar histórico.', 'danger');
        }
      });
    }
  }
}