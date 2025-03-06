import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { AuthService } from 'src/app/core/services/auth.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterLink,
    ToastModule,
    ProgressSpinnerModule,
  ],
  templateUrl: `./login.component.html`,
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  public loginForm: FormGroup;
  public loading: boolean = false;

  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _messageService = inject(MessageService);

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.loading = true;

      const { email, password } = this.loginForm.value;

      this._authService.login({ email, password }).subscribe({
        next: () => {
          this.loading = false;

          this._messageService.add({
            severity: 'success',
            summary: 'Login',
            detail: 'Login realizado com sucesso'
          });

          this._router.navigate(['/home']);
        },
        error: (err) => {
          this.loading = false;

          this._messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha no login. Verifique suas credenciais.'
          });
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
