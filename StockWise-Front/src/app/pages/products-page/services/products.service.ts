import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private apiURL = 'http://127.0.0.1:3000/api/products';

  constructor(private _httpClient: HttpClient) {}

  getProductsAPI(): Observable<IProduct[]> {
    return this._httpClient.get<IProduct[]>(this.apiURL);
  }

  getProductByIdAPI(id: string): Observable<IProduct> {
    return this._httpClient.get<IProduct>(`${this.apiURL}/${id}`);
  }

  getProductByIdAPI2(): Observable<IProduct> {
    return this._httpClient.get<IProduct>(`${this.apiURL}/2`);
  }
}
