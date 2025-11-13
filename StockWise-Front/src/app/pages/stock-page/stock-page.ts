import { Component, effect, OnInit, signal, WritableSignal } from '@angular/core';
import { Stock } from '@app/models/stock.model';
import { StockService } from '@app/services/stock.service';
import { StockTable } from '@app/components/stock-table/stock-table';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-stock-page',
  imports: [StockTable, AsyncPipe],
  templateUrl: './stock-page.html',
  styleUrl: './stock-page.css',
})
export class StockPage {
  stockList$!: Observable<Stock[]>;
  showConfirmModal = signal(false);
  selectedStock: WritableSignal<Stock> = signal({
    ID: 0,
    ID_PRODUCTO: 0,
    CANTIDAD_DEPOSITO: 0,
    CANTIDAD_SUCURSAL: 0,
  });
  loading = signal(false);
  resultMessage = signal<string>('');

  constructor(private _stockService: StockService) {
    effect(() => {
      this.stockList$ = this._stockService.loadStockList();
    });
  }

  reloadStockList() {
    this.stockList$ = this._stockService.loadStockList();
  }

  openEditStockModal(item: Stock) {
    this.resultMessage.set('');
    console.log('editando registro stock..', item.ID);
    this.showConfirmModal.set(true);
    this.selectedStock.set(item);
  }

  closeEditStockModal() {
    this.showConfirmModal.set(false);
  }

  completeStockUpdate() {
    this.loading.set(true)
    this._stockService.updateProductStock(this.selectedStock()).subscribe({
      next: (data) => {
        console.log('Stock de producto actualizado', data)
        this.resultMessage.set('EXITO');
        this.loading.set(false);
        setTimeout(()=>{
          this.reloadStockList();
          this.closeEditStockModal();
        }, 2000)
      },
      error: (err) => {
        console.log('Ocurrio un error: ', err);
        this.resultMessage.set('ERROR');
        this.loading.set(false);
        setTimeout(()=>{
          this.closeEditStockModal();
        }, 2000)
      }
    })
  }

  increaseStorageStock() {
    this.selectedStock.update((currentProdStock) => ({
      ...currentProdStock,
      CANTIDAD_DEPOSITO: currentProdStock.CANTIDAD_DEPOSITO + 1,
    }));
  }

  decreaseStorageStock() {
    if (this.selectedStock().CANTIDAD_DEPOSITO === 0) return;

    this.selectedStock.update((currentProdStock) => ({
      ...currentProdStock,
      CANTIDAD_DEPOSITO: currentProdStock.CANTIDAD_DEPOSITO - 1,
    }));
  }

  increaseBranchStock() {
    this.selectedStock.update((currentProdStock) => ({
      ...currentProdStock,
      CANTIDAD_SUCURSAL: currentProdStock.CANTIDAD_SUCURSAL + 1,
      CANTIDAD_DEPOSITO: currentProdStock.CANTIDAD_DEPOSITO - 1,
    }));
  }

  decreaseBranchStock() {
    if (this.selectedStock().CANTIDAD_SUCURSAL === 0) return;

    this.selectedStock.update((currentProdStock) => ({
      ...currentProdStock,
      CANTIDAD_SUCURSAL: currentProdStock.CANTIDAD_SUCURSAL - 1,
      CANTIDAD_DEPOSITO: currentProdStock.CANTIDAD_DEPOSITO + 1,
    }));
  }
}
