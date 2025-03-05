import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: any;

    const mockAuthService = {
        register: jasmine.createSpy('register').and.returnValue(of({}))
    };

    const mockMessageService = {
        add: jasmine.createSpy('add')
    };

    const mockActivatedRoute = {
        snapshot: { queryParams: {} }
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RegisterComponent, ReactiveFormsModule],
            providers: [
                provideHttpClientTesting(),
                { provide: AuthService, useValue: mockAuthService },
                { provide: MessageService, useValue: mockMessageService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Form Validation', () => {
        it('should validate username field', () => {
            const usernameControl = component.registerForm.get('username');

            expect(usernameControl?.valid).toBeFalse();
            usernameControl?.setValue('validUsername');
            expect(usernameControl?.valid).toBeTrue();
        });

        it('should validate email field', () => {
            const emailControl = component.registerForm.get('email');

            expect(emailControl?.valid).toBeFalse();

            emailControl?.setValue('invalid-email');
            expect(emailControl?.valid).toBeFalse();

            emailControl?.setValue('valid-email@example.com');
            expect(emailControl?.valid).toBeTrue();
        });

        it('should validate password field', () => {
            const passwordControl = component.registerForm.get('password');

            expect(passwordControl?.valid).toBeFalse();

            passwordControl?.setValue('short');
            expect(passwordControl?.valid).toBeFalse();

            passwordControl?.setValue('longenoughpassword');
            expect(passwordControl?.valid).toBeTrue();
        });

        it('should validate confirmPassword field', () => {
            const confirmPasswordControl = component.registerForm.get('confirmPassword');

            expect(confirmPasswordControl?.valid).toBeFalse();

            confirmPasswordControl?.setValue('somepassword');
            expect(confirmPasswordControl?.valid).toBeTrue();
        });
    });
});