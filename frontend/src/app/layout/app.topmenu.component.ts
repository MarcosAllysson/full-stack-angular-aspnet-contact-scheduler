import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';


@Component({
    selector: 'app-topmenu',
    templateUrl: './app.topmenu.component.html',
    standalone: true,
    imports: [MegaMenuModule],
})
export class TopMenu implements OnInit {
    items: MegaMenuItem[] = [];

    ngOnInit() {
        this.items = [
            {
                label: 'Company',
                items: [
                    [
                        {
                            label: 'Living Room',
                            items: [{ label: 'Accessories' }, { label: 'Armchair' }, { label: 'Coffee Table' }, { label: 'Couch' }, { label: 'TV Stand' }, { label: 'TV Stand' }]
                        }
                    ]
                ]
            },


        ]
    }
}