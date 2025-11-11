import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  imports: [CommonModule],
  templateUrl: './modal-confirm.html',
  styleUrl: './modal-confirm.css',
})
export class ModalConfirm {
  // Input para recibir si el modal debe mostrarse
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
