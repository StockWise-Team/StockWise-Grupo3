import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sale } from '../models/sales.model';
import { Product, SaleItem } from '../models/product.model';

interface ProductDB {
  NOMBRE: string;
  DESCRIPCION?: string;
  CATEGORIA?: string;
  PRECIO: number;
  ID_PRODUCTO?: number;
}

@Injectable({ providedIn: 'root' })
export class SalesPageSalesService {
  private readonly http = inject(HttpClient);
  private readonly _sales = signal<Sale[]>([]);
  private readonly apiUrl = 'http://127.0.0.1:3000/api/products';

  // Load today's sales from backend (to be implemented)
  loadTodaySales(): void {
    // Start with empty array - backend integration pending
    this._sales.set([]);
  }

  get sales() { return this._sales.asReadonly(); }

  cancelPreviousSale(): void {
    const current = this._sales();
    if (!current.length) return;
    const last = { ...current[current.length - 1] };
    if (last.status !== 'Cancelled') {
      last.status = 'Cancelled';
      const next = current.slice(0, -1).concat(last);
      this._sales.set(next);
    }
  }

  makeSale(amount: number): void {
    if (!(amount > 0)) return;
    const current = this._sales();
    const nextId = (current[current.length - 1]?.id ?? 0) + 1;
    const lastNumber = current[current.length - 1]?.number ?? 'S-0000';
    // Extract numeric part and increment
    const match = /S-(\d{4})/.exec(lastNumber);
    const seq = match ? parseInt(match[1], 10) + 1 : 1;
    const nextNumber = `S-${seq.toString().padStart(4, '0')}`;

    const now = new Date();
    const sale: Sale = {
      id: nextId,
      number: nextNumber,
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        0
      ).toISOString(),
      amount,
      status: 'Completed',
    };
    this._sales.set([...current, sale]);
  }

  // Search products by name from database (case-insensitive partial match)
  searchProducts(query: string): Observable<Product[]> {
    if (!query.trim()) {
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }

    return this.http.get<ProductDB[]>(this.apiUrl).pipe(
      map(products => {
        const lowerQuery = query.toLowerCase();
        return products
          .filter(p => p.NOMBRE.toLowerCase().includes(lowerQuery))
          .map(p => ({
            id: p.ID_PRODUCTO || 0,
            name: p.NOMBRE,
            unitPrice: p.PRECIO,
            imageUrl: ''
          }));
      })
    );
  }

  // Create sale from items - POST to backend
  createOngoingSale(items: SaleItem[]): Observable<any> {
    // Using hardcoded user ID until authentication is implemented
    const idUsuario = 6; // Carlos - EMPLEADO

    const saleData = {
      idUsuario,
      items: items.map(item => ({
        idProducto: item.product.id,
        cantidad: item.quantity,
        precioUnitario: item.product.unitPrice
      }))
    };

    return this.http.post('http://127.0.0.1:3000/api/sales', saleData);
  }
}
