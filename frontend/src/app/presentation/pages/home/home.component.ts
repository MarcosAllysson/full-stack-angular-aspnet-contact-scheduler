import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit
} from '@angular/core';

import {
    Router,
    RouterLink
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { IFeature } from './IFeature';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        CommonModule,
        DialogModule,
        ButtonModule,
        IconFieldModule,
        InputIconModule,
        TooltipModule
    ],
    templateUrl: './home-view.html',
    styleUrl: './home-view.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    private router = inject(Router);
    public features: IFeature[] = [];

    constructor() { }

    ngOnInit(): void {
        this.features = [
            {
                icon: 'pi pi-users',
                title: 'Cadastro de Contatos',
                description: 'Adicione e gerencie seus contatos com facilidade. Validação automática para evitar cadastros duplicados.'
            },
            {
                icon: 'pi pi-search',
                title: 'Consulta Avançada',
                description: 'Busque contatos rapidamente com filtros inteligentes e visualização detalhada.'
            },
            {
                icon: 'pi pi-pencil',
                title: 'Edição e Inativação',
                description: 'Atualize informações de contatos e inative quando necessário, mantendo seu banco de dados organizado.'
            },
            {
                icon: 'pi pi-star',
                title: 'Contatos Favoritos',
                description: 'Marque contatos importantes como favoritos para acesso rápido e fácil.'
            }
        ];
    }

    public navigateToContacts() {
        this.router.navigate(['/contact/listing']);
    }
}
