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
    return this._httpClient.get<any[]>(this.apiURL);
  }
}
