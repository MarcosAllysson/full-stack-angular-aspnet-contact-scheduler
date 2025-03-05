import {
  AbstractControl,
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
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterLink,
    ToastModule
  ],
  templateUrl: `./register.component.html`,
  styleUrl: './register.component.scss',
  providers: [MessageService]
})
export class RegisterComponent {
  public registerForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _messageService = inject(MessageService);

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  public passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  public register(): void {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;

      this._authService.register({
        username,
        email,
        password,
        confirmPassword: this.registerForm.get('confirmPassword')?.value
      }).subscribe({
        next: () => {
          this._messageService.add({
            severity: 'success',
            summary: 'Cadastro',
            detail: 'Cadastro realizado com sucesso!'
          });

          this._router.navigate(['/auth/login']);
        },
        error: () => {
          this._messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao cadastrar'
          });
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
