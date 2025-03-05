import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule
  ],
  templateUrl: './contact-tabview.html',
  styleUrl: './contact-tabview.scss',
})
export class ContactViewController {
  public tabs: { header: string; component: any }[] = [];

  ngOnInit(): void {
    this.tabs = [
      { header: '', component: '' },
    ];
  }
}
