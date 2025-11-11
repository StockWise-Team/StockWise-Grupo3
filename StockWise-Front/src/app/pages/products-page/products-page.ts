import { ChangeDetectorRef, Component } from '@angular/core';
import { IProduct } from './models/products.model';
import { ProductApiService } from './services/products.service';
import { ModalDetails } from './modals/modal-details/modal-details';
import { ModalEdit } from './modals/modal-edit/modal-edit';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-page',
  imports: [ ModalDetails, ModalEdit, CommonModule],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage {
  productsList: IProduct[] = [];
  showModalDetail: boolean = false;
  showModalConfirm: boolean = false;
  showModalEdit: boolean = false;
  producDetail: IProduct = {
    ID: 0,
    NOMBRE: '',
    DESCRIPCION: '',
    CATEGORIA: '',
    PRECIO: 0,
    ACTIVO: false,
  };

  constructor(private _apiProducts: ProductApiService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._apiProducts.getAllProductsAPI().subscribe({
      next: (data) => {
        this.productsList = data;

        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openModalDetail(product: IProduct): void {
    this.showModalDetail = true;
    this.producDetail = product;
  }

  closeModalDetail(): void {
    this.showModalDetail = false;
  }

  updateStatusProduct(id: number): void {
    this._apiProducts.updateProductStatusAPI(id).subscribe({
      next: (data) => {
        this.getAllProducts();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openModalEdit(): void {
    this.showModalEdit = true;
  }

  closeModalEdit(): void {
    this.showModalEdit = false;
  }
}
