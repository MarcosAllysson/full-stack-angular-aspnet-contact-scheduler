import {
    Component,
    ElementRef,
    inject,
    ViewChild
} from '@angular/core';

import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    standalone: true,
    imports: [
        RouterLink,
        CommonModule,
    ]
})
export class AppTopBarComponent {

    public items!: MenuItem[];
    public userMenuVisible = false;

    public layoutService = inject(LayoutService);

    @ViewChild('topbarmenu') menu!: ElementRef;
    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    constructor() { }
}
