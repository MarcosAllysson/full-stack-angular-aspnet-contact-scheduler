import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';
import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: any;

  const mockAuthService = {
    login: jasmine.createSpy('login').and.returnValue(of({}))
  };

  const mockActivatedRoute = {
    snapshot: { queryParams: {} }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordComponent, ReactiveFormsModule],
      providers: [
        provideHttpClientTesting(),
        { provide: AuthService, useValue: mockAuthService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute } // Mock do ActivatedRoute
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    it('should validate email field', () => {
      const emailControl = component.forgotForm.get('email');

      expect(emailControl?.valid).toBeFalse();

      emailControl?.setValue('invalid-email');
      expect(emailControl?.valid).toBeFalse();

      emailControl?.setValue('valid-email@example.com');
      expect(emailControl?.valid).toBeTrue();
    });
  });
});
