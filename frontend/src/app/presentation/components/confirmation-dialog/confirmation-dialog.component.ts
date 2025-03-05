import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule
  ],
  templateUrl: `./confirmation-dialog.component.html`
})
export class ConfirmationDialogComponent {
  @Input() visible: boolean = false;
  @Input() title: string = 'Confirmação';
  @Input() message: string = 'Tem certeza que deseja continuar?';
  @Input() details?: string;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
    this.visible = false;
  }

  onCancel() {
    this.cancel.emit();
    this.visible = false;
  }
}