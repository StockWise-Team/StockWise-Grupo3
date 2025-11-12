import { Component } from '@angular/core';
import { Stock } from '@app/models/stock.model';
import { StockService } from '@app/services/stock.service';

@Component({
  selector: 'app-stock-page',
  imports: [],
  templateUrl: './stock-page.html',
  styleUrl: './stock-page.css',
})
export class StockPage {
  stockList: Stock[] = [];

  constructor(private _stockService: StockService) {}

  OnInit(): void {
    console.log('inicio stock page');
    this.getStockList();
  }

  getStockList() {
    console.log('consulta servicio stock')
    this._stockService.loadStockList().subscribe({
      next: (data) => (this.stockList = data),
      error: (err) => console.log(err),
    });
  }
}
