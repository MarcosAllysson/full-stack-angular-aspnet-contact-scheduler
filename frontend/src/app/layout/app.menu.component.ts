import { inject, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NgFor, NgIf } from '@angular/common';

import { LayoutService } from './service/app.layout.service';
import { AppMenuitemComponent } from './app.menuitem.component';
import { AuthService } from '../core/services/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    standalone: true,
    imports: [NgFor, NgIf, AppMenuitemComponent]
})
export class AppMenuComponent implements OnInit {
    public model: MenuItem[] = [];

    private _authService = inject(AuthService);
    private _layoutService = inject(LayoutService);

    constructor() { }

    ngOnInit() {
        this.model = [
            {
                label: '',
                items: [
                    {
                        label: 'Início',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['home']
                    },
                    {
                        label: 'Agendamentos',
                        icon: 'pi pi-fw pi-table',
                        items: [
                            {
                                label: 'Contatos',
                                routerLink: ['contact/listing']
                            },
                            {
                                label: 'Favoritos',
                                routerLink: ['contact/favorites']
                            },
                            {
                                label: 'Desativados',
                                routerLink: ['contact/disabled']
                            },
                        ]
                    },
                    {
                        label: 'Sistema',
                        icon: 'pi pi-fw pi-cog',
                        items: [
                            {
                                label: 'Sair',
                                command: () => { this._authService.logout() }
                            },
                        ]
                    },
                ],
            },
        ];
    }
}
