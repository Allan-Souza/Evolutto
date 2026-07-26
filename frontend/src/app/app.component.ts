import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { UserStoreService } from './core/store/user-store.service';
import { AuthService } from './core/auth/auth.service';
import { ToastService } from './core/services/toast.service';
import { ToastComponent } from './shared/components/toast/toast.component';
import { LevelUpModalComponent } from './shared/components/level-up-modal/level-up-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ToastComponent, LevelUpModalComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userStore = inject(UserStoreService);
  authService = inject(AuthService);
  toastService = inject(ToastService);

  showLevelUpModal = false;
  newLevel = 1;

  ngOnInit() {
    this.userStore.levelUp$.subscribe(level => {
      this.newLevel = level;
      this.showLevelUpModal = true;
    });

    this.userStore.debuffCleared$.subscribe(() => {
      this.toastService.show('✨ Você se redimiu! Sua Lojinha foi descongelada.', 'success');
    });
  }

  closeModal() {
    this.showLevelUpModal = false;
  }
}
