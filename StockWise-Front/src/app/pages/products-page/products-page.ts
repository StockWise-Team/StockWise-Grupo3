import { ChangeDetectorRef, Component } from '@angular/core';
import { Sidemenu } from '../../shared/sidemenu/sidemenu';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { IProduct } from './models/products.model';
import { ProductApiService } from './services/products.service';

@Component({
  selector: 'app-products-page',
  imports: [Sidemenu, Header, Footer],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage {
  productsList: IProduct[] = [];

  constructor(private _apiProducts: ProductApiService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._apiProducts.getProductsAPI().subscribe({
      next: (data) => {
        this.productsList = data;
        console.log(this.productsList);

        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
