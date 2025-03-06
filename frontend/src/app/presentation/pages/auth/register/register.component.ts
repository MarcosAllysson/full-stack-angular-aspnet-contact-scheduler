import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
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
      username: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        this.passwordStrengthValidator
      ]],
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

  public passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasNonAlphanumeric = /[^a-zA-Z0-9]/.test(value);

    const errors: ValidationErrors = {};

    if (!hasUpperCase) {
      errors['noUpperCase'] = true;
    }

    if (!hasLowerCase) {
      errors['noLowerCase'] = true;
    }

    if (!hasDigit) {
      errors['noDigit'] = true;
    }

    if (!hasNonAlphanumeric) {
      errors['noNonAlphanumeric'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  }

  public hasPasswordError(errorName: string): boolean {
    return this.registerForm.get('password')?.hasError(errorName)
      && this.registerForm.get('password')?.touched === true;
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
