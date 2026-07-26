import { Component, EventEmitter, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconComponent } from '@ng-icons/core';
import { UserStoreService } from '../../../core/store/user-store.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIconComponent],
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<void>();

  userStore = inject(UserStoreService);
  toastService = inject(ToastService);

  editName = '';
  selectedAvatar = '';

  availableAvatars = [
    'lucideUser',
    'lucideSwords',
    'lucideWand',
    'lucideShield',
    'lucideCrown',
    'lucideFlame',
    'lucideGhost',
    'lucideRocket'
  ];

  ngOnInit() {
    this.editName = this.userStore.username();
    this.selectedAvatar = this.userStore.avatar();
  }

  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  saveProfile() {
    if (!this.editName.trim()) {
      this.toastService.show('O nome não pode ser vazio.', 'danger');
      return;
    }
    
    this.userStore.updateProfile(this.editName.trim(), this.selectedAvatar);
    this.toastService.show('Perfil atualizado com sucesso!', 'success');
    this.onClose();
  }

  onClose() {
    this.closeEvent.emit();
  }
}
