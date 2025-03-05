import {
  Component,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { ContactService } from 'src/app/presentation/services/contact.service';
import { ContactResponse } from 'src/app/presentation/interfaces/ContactResponse';
import { MessageService } from 'primeng/api';
import { ContactRegister } from 'src/app/presentation/interfaces/ContactRegister';
import { ContactUpdate } from 'src/app/presentation/interfaces/ContactUpdate';
import { TooltipModule } from 'primeng/tooltip';
import { formatPhoneNumber } from 'src/app/presentation/shared/utils/formatPhoneNumber';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    CheckboxModule,
    ToastModule,
    ProgressSpinnerModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule
  ],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss',
  providers: [MessageService]
})
export class ListingComponent implements OnInit {
  @ViewChild('dt') table: Table;

  public data: ContactResponse[] = [];
  public loading: boolean = true;
  public contactDialog: boolean = false;

  public contactForm: FormGroup;

  private _fb = inject(FormBuilder);
  private _messageService = inject(MessageService);
  private _contactService = inject(ContactService);

  constructor() {
    this.contactForm = this._fb.group({
      id: [{ value: '', disabled: true }],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      cellPhone: ['', [
        Validators.required,
        Validators.pattern(/^\(\d{2}\) \d \d{4}-\d{4}$/)
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^\(\d{2}\) \d{4}-\d{4}$/)
      ]],
      isFavorite: [false],
      isActive: [true]
    });
  }

  public ngOnInit() {
    this.loadContacts();
  }

  private loadContacts() {
    this.loading = true;

    this._contactService.getContacts().subscribe({
      next: (contacts) => {
        this.data = contacts;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;

        this._messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar contatos'
        });
      }
    });
  }

  public openNew() {
    this.contactForm.reset({
      isFavorite: false,
      isActive: true
    });

    this.contactDialog = true;
  }

  public editContact(contact: ContactResponse) {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control.setErrors(null);
      control.markAsUntouched();
    });

    this.contactForm.patchValue(contact);

    Object.keys(contact).forEach(key => {
      if (contact[key] !== null && contact[key] !== undefined) {
        const control = this.contactForm.get(key);
        if (control) {
          control.setErrors(null);
          control.markAsTouched();
        }
      }
    });

    this.contactDialog = true;
  }

  public saveContact() {
    if (this.contactForm.invalid) {
      this._messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Preencha todos os campos corretamente'
      });

      return;
    }

    const contactData = this.contactForm.getRawValue();
    const cleanedContactData = this.cleanPhoneNumbers(contactData);

    if (contactData.id) {
      this.updateContact(contactData);
    } else {
      this.createContact(contactData);
    }
  }

  private cleanPhoneNumbers(contactData: any) {
    contactData.cellPhone = contactData.cellPhone.replace(/\D+/g, '');
    contactData.phone = contactData.phone.replace(/\D+/g, '');
    return contactData;
  }

  public formatNumber(phoneNumber: string, isCellPhone: boolean = false): string {
    return formatPhoneNumber(phoneNumber, isCellPhone);
  }

  private createContact(contactData: ContactRegister) {

    this._contactService.createContact(contactData).subscribe({
      next: (newContact) => {
        this.loadContacts();
        this.contactDialog = false;

        this._messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Contato criado'
        });
      },
      error: () => {
        this._messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao criar contato'
        });
      }
    });
  }

  private updateContact(contactData: ContactUpdate) {

    this._contactService.updateContact(contactData.id, contactData).subscribe({
      next: (updatedContact) => {
        this.contactDialog = false;
        this.loadContacts();

        this._messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Contato atualizado'
        });
      },
      error: () => {
        this._messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao atualizar contato'
        });
      }
    });
  }

  public deleteContact(contact: ContactResponse) {
    this._contactService.deactivateContact(contact.id).subscribe({
      next: () => {
        this.loadContacts();

        this._messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Contato removido'
        });
      },
      error: () => {
        this._messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao remover contato'
        });
      }
    });
  }

  public onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}