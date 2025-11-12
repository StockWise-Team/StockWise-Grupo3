import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Stock } from '@app/models/stock.model';
import { StockService } from '@app/services/stock.service';

@Component({
  selector: 'app-stock-table',
  imports: [],
  templateUrl: './stock-table.html',
  styleUrl: './stock-table.css',
})
export class StockTable {
  @Input() StockList: Stock[] = [];
  @Output() productStockDeleted = new EventEmitter<number>();

  constructor(private _stockService: StockService){}

  actualizarStock(id: number) {
    console.log('actualizando stock de producto..', id);
  }

  eliminarStock(id: number) {
    console.log('click boton front eliminar stock de producto..', id);
    this._stockService.deleteProductStock(id).subscribe({
      next: (data) => {
        console.log('response exitosa al eliminar', data)
        this.productStockDeleted.emit(data.ID);
      }
    })
  }
}
