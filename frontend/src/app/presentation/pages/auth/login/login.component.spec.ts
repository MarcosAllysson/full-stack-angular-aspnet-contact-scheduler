import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/core/services/auth.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: any;

    const mockAuthService = {
        login: jasmine.createSpy('login').and.returnValue(of({}))
    };

    const mockActivatedRoute = {
        snapshot: { queryParams: {} }
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoginComponent, ReactiveFormsModule],
            providers: [
                provideHttpClientTesting(),
                { provide: AuthService, useValue: mockAuthService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute } // Mock do ActivatedRoute
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Form Validation', () => {
        it('should validate email field', () => {
            const emailControl = component.loginForm.get('email');

            expect(emailControl?.valid).toBeFalse();

            emailControl?.setValue('invalid-email');
            expect(emailControl?.valid).toBeFalse();

            emailControl?.setValue('valid-email@example.com');
            expect(emailControl?.valid).toBeTrue();
        });

        it('should validate password field', () => {
            const passwordControl = component.loginForm.get('password');

            expect(passwordControl?.valid).toBeFalse();

            passwordControl?.setValue('short');
            expect(passwordControl?.valid).toBeFalse();

            passwordControl?.setValue('longenoughpassword');
            expect(passwordControl?.valid).toBeTrue();
        });
    });
});
