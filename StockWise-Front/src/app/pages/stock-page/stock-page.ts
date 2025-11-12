import { Component, effect, OnInit, signal } from '@angular/core';
import { Stock } from '@app/models/stock.model';
import { StockService } from '@app/services/stock.service';
import { GenericTable } from '@app/shared/generic-table/generic-table';
import { StockTable } from "@app/components/stock-table/stock-table";
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-stock-page',
  imports: [ StockTable, AsyncPipe],
  templateUrl: './stock-page.html',
  styleUrl: './stock-page.css',
})
export class StockPage {
  stockList$!: Observable<Stock[]>;


  constructor(private _stockService: StockService) {
    effect(() => {
      this.stockList$ = this._stockService.loadStockList();
    })
  }
}
