import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterLink,
    ToastModule,
  ],
  templateUrl: `./forgot-password.component.html`,
  styleUrl: './forgot-password.component.scss',
  providers: [MessageService]
})
export class ForgotPasswordComponent {
  public forgotForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _messageService = inject(MessageService);

  ngOnInit(): void {
    this.forgotForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public recoverPassword(): void {
    if (this.forgotForm.valid) {
      const { email } = this.forgotForm.value;

      this._authService.forgotPassword(email).subscribe({
        next: () => {
          this._messageService.add({
            severity: 'success',
            summary: 'Recuperação de Senha',
            detail: 'Se este email estiver cadastrado, você receberá um link para redefinir a senha.'
          });
          this._router.navigate(['/auth/login']);
        },
        error: () => {
          this._messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao tentar recuperar a senha.'
          });
        }
      });
    } else {
      this.forgotForm.markAllAsTouched();
    }
  }
}
