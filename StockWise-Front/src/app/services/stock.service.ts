import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CashHistory, CashOperation, CashStatus } from '@app/models/cash.model';
import { Stock } from '@app/models/stock.model';



@Injectable({ providedIn: 'root' })
export class StockService {
  private readonly apiUrl = 'http://127.0.0.1:3000/api/cash';
  private listeners: Function[] = [];
  currentStock:Stock[] = []

  constructor(private http: HttpClient) {
  }

  // Notifica a todos los componentes suscritos que el estado cambió
  private notifyListeners(): void {
    this.listeners.forEach(callback => callback());
  }

  // Obtiene la tabla de stock de productos completa desde el servidor
  loadStockList(): Observable<Stock[]> {
    console.log('Trayendo el stock de la base...')
    return new Observable(observer => {
      this.http.get<Stock[]>(`${this.apiUrl}/stock`).subscribe({
        next: (data) => {
          this.currentStock = data;
          observer.next(data);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

}
