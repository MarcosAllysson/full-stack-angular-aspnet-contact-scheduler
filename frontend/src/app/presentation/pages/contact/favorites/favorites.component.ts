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
import { formatPhoneNumber } from 'src/app/presentation/shared/utils/formatPhoneNumber';

@Component({
  selector: 'app-favorites',
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
  templateUrl: `./favorites.component.html`,
  styleUrl: './favorites.component.scss',
  providers: [MessageService]
})
export class FavoritesComponent implements OnInit {
  @ViewChild('dt') table: Table;

  public data: ContactResponse[] = [];
  public loading: boolean = false;
  public contactDialog: boolean = false;
  public selectedContact: ContactResponse | null = null;

  private _messageService = inject(MessageService);
  private _contactService = inject(ContactService);

  ngOnInit() {
    this.loadFavorites();
  }

  private loadFavorites() {
    this.loading = true;

    this._contactService.getFavorites().subscribe({
      next: (contacts) => {
        this.data = contacts;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;

        this._messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar favoritos'
        });
      }
    });
  }

  public toggleFavorite(contact: ContactResponse) {
    this.loading = true;

    this._contactService.toggleFavorite(contact.id).subscribe({
      next: () => {
        this.loadFavorites();
        this.loading = false;

        this._messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Contato desfavoritado'
        });
      },
      error: () => {
        this.loading = false;

        this._messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao favoritar contato'
        });
      }
    });
  }

  public formatNumber(phoneNumber: string, isCellPhone: boolean = false): string {
    return formatPhoneNumber(phoneNumber, isCellPhone);
  }

  public onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
