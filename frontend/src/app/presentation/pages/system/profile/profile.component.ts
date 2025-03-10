import {
  Component,
  inject
} from '@angular/core';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

import { AuthService } from 'src/app/core/services/auth.service';
import { IUserProfile } from '../../auth/interfaces/IUserProfile';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
  templateUrl: `./profile.component.html`,
  styleUrl: './profile.component.scss',
  providers: [MessageService]
})
export class ProfileComponent {
  public profile: IUserProfile | null = null;
  public loading: boolean = false;

  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _messageService = inject(MessageService);

  ngOnInit(): void {
    this.getProfile();
  }

  private getProfile() {
    this.loading = true;

    this._authService.getProfile().subscribe({
      next: (profileData) => {
        this.loading = false;
        this.profile = profileData;
      },
      error: () => {
        this.loading = false;

        this._messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar dados do perfil.'
        });
      }
    });
  }

  // public logout(): void {
  //   this._authService.logout();
  //   this._router.navigate(['/auth/login']);
  // }
}
