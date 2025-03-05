import { PrimeNGConfig } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent implements OnInit {

    private _primengConfig = inject(PrimeNGConfig);

    constructor() { }

    public ngOnInit() {
        this._primengConfig.ripple = true;
    }
}

