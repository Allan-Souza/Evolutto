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
        this.toastService.show('Erro ao vincular (UsuÃƒÂ¡rio nÃƒÂ£o encontrado)', 'danger');
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
  onReviewHabit(advId: string, logId: string, approved: boolean) {
    this.parentalService.reviewHabit(logId, approved).subscribe({
      next: () => {
        // Atualiza a lista otimisticamente
        const logs = this.adventurerLogs[advId];
        if (logs) {
          const targetLog = logs.find(l => l.id === logId);
          if (targetLog) {
            targetLog.status = approved ? 'COMPLETED' : 'REJECTED';
          }
        }
        
        // Se aprovou, forçamos um recarregamento dos dados do aventureiro para pegar o novo XP/Moedas
        if (approved) {
          this.loadAdventurers();
        }

        this.toastService.show(approved ? 'Hábito aprovado com sucesso! ✅' : 'Hábito rejeitado. ❌', approved ? 'success' : 'danger');
      },
      error: () => {
        this.toastService.show('Erro ao processar aprovação.', 'danger');
      }
    });
  }
}