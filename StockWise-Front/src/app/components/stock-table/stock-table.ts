import { Component, Input } from '@angular/core';
import { Stock } from '@app/models/stock.model';

@Component({
  selector: 'app-stock-table',
  imports: [],
  templateUrl: './stock-table.html',
  styleUrl: './stock-table.css',
})
export class StockTable {
  @Input() StockList: Stock[] = [];

  actualizarStock(id: number) {
    console.log('actualizando stock de producto..', id);
  }

  eliminarStock(id: number) {
    console.log('actualizando stock de producto..', id);
  }
}
