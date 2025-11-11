import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-edit',
  imports: [CommonModule],
  templateUrl: './modal-edit.html',
  styleUrl: './modal-edit.css',
})
export class ModalEdit {
  @Input() isVisible: boolean = false;

  // Output para notificar al componente padre que se debe cerrar
  @Output() close = new EventEmitter<void>();

  /**
   * Cierra el modal y emite el evento 'close'.
   */
  closeModal(): void {
    this.close.emit();
  }
}
