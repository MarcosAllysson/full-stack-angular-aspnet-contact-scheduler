import {
  Component,
  inject,
  OnInit,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { ContactService } from 'src/app/presentation/services/contact.service';
import { ContactResponse } from 'src/app/presentation/interfaces/ContactResponse';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-disabled',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    CheckboxModule,
    ProgressSpinnerModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule
  ],
  templateUrl: `./disabled.component.html`,
  styleUrl: './disabled.component.scss',
  providers: [MessageService]
})
export class DisabledComponent implements OnInit {
  @ViewChild('dt') table: Table;

  public data: ContactResponse[] = [];
  public loading: boolean = true;

  private _messageService = inject(MessageService);
  private _contactService = inject(ContactService);

  ngOnInit() {
    this.loadDisabled();
  }

  private loadDisabled() {
    this.loading = true;

    this._contactService.getDisabledContacts().subscribe({
      next: (contacts) => {
        this.data = contacts;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;

        this._messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar contatos desativos.'
        });
      }
    });
  }

  public activateContact(contact: ContactResponse) {
    this.loading = true;

    this._contactService.activateContact(contact.id).subscribe({
      next: () => {
        this.loadDisabled();
        this.loading = false;

        this._messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Contato ativado'
        });
      },
      error: () => {
        this.loading = false;

        this._messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao ativar contato'
        });
      }
    });
  }

  public onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
