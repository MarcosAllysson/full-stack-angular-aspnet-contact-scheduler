import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

import { ListingComponent } from './listing.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { ContactService } from 'src/app/presentation/services/contact.service';

describe('ListingComponent', () => {
    let component: ListingComponent;
    let fixture: any;

    const mockContactService = {
        getContacts: jasmine.createSpy('getContacts').and.returnValue(of([])),
        addContact: jasmine.createSpy('addContact').and.returnValue(of({})),
        updateContact: jasmine.createSpy('updateContact').and.returnValue(of({})),
        deleteContact: jasmine.createSpy('deleteContact').and.returnValue(of({}))
    };

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
            imports: [ListingComponent, ReactiveFormsModule],
            providers: [
                provideHttpClientTesting(),
                { provide: AuthService, useValue: mockAuthService },
                { provide: MessageService, useValue: mockMessageService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: ContactService, useValue: mockContactService }
            ]
        }).compileComponents();
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListingComponent, ReactiveFormsModule],
            providers: [
                provideHttpClientTesting(),
                { provide: AuthService, useValue: mockAuthService },
                { provide: MessageService, useValue: mockMessageService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Form Validation', () => {
        it('should validate name field', () => {
            const nameControl = component.contactForm.get('name');
            expect(nameControl?.valid).toBeFalse();
            nameControl?.setValue('Jo');
            expect(nameControl?.valid).toBeFalse();
            nameControl?.setValue('John Doe');
            expect(nameControl?.valid).toBeTrue();
        });

        it('should validate email field', () => {
            const emailControl = component.contactForm.get('email');
            expect(emailControl?.valid).toBeFalse();
            emailControl?.setValue('invalid-email');
            expect(emailControl?.valid).toBeFalse();
            emailControl?.setValue('valid@example.com');
            expect(emailControl?.valid).toBeTrue();
        });

        it('should validate cellPhone field', () => {
            const cellPhoneControl = component.contactForm.get('cellPhone');
            expect(cellPhoneControl?.valid).toBeFalse();
            cellPhoneControl?.setValue('12345');
            expect(cellPhoneControl?.valid).toBeFalse();
            cellPhoneControl?.setValue('(12) 9 1234-5678');
            expect(cellPhoneControl?.valid).toBeTrue();
        });

        it('should validate phone field', () => {
            const phoneControl = component.contactForm.get('phone');
            expect(phoneControl?.valid).toBeFalse();
            phoneControl?.setValue('12345');
            expect(phoneControl?.valid).toBeFalse();
            phoneControl?.setValue('(12) 1234-5678');
            expect(phoneControl?.valid).toBeTrue();
        });
    });
});
