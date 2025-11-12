import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models/products.model';
import { FormsModule } from '@angular/forms';
import { ProductApiService } from '../../services/products.service';
import { ProductDB } from '@app/models/productDB.model';

@Component({
  selector: 'app-modal-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-edit.html',
  styleUrl: './modal-edit.css',
})
export class ModalEdit {
  // Input que indica si se debe mostrar o no el modal por parte del componente padre
  @Input() isVisible: boolean = true;
  // Output para notificar al componente padre que se debe cerrar
  @Output() close = new EventEmitter<boolean>();
  @Input() detailProduct: ProductDB | undefined;

  nombre: string = '';
  categoria: string = '';
  descripcion: string = '';
  precio: number = 0;

  constructor(private _apiProducts: ProductApiService, private cdRef: ChangeDetectorRef) {}

  updateProduct() {
    const updatedProduct: IProduct = {
      ID: this.detailProduct?.ID ?? 0,
      NOMBRE: this.nombre == '' ? this.detailProduct?.NOMBRE ?? '' : this.nombre.toUpperCase(),
      CATEGORIA:
        this.categoria == '' ? this.detailProduct?.CATEGORIA ?? '' : this.categoria.toUpperCase(),
      DESCRIPCION:
        this.descripcion == ''
          ? this.detailProduct?.DESCRIPCION ?? ''
          : this.descripcion.toUpperCase(),
      PRECIO: this.precio == null ? this.detailProduct?.PRECIO ?? 0 : this.precio,
      ACTIVE: this.detailProduct?.ACTIVE ?? true,
    };

    this._apiProducts.udpateProductAPI(updatedProduct).subscribe({
      next: (data) => {
        this.nombre = '';
        this.categoria = '';
        this.descripcion = '';
        this.precio = 0;

        this.close.emit(true);
        this.isVisible = false;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  /**
   * Cierra el modal y emite el evento 'close'.
   */
  closeModal(): void {
    this.nombre = '';
    this.categoria = '';
    this.descripcion = '';
    this.precio = 0;
    
    this.isVisible = false;
    this.close.emit(true);
  }
}
