import { ChangeDetectorRef, Component } from '@angular/core';
import { Sidemenu } from '../../shared/sidemenu/sidemenu';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { IProduct } from './models/products.model';
import { ProductApiService } from './services/products.service';
import { ModalDetails } from './modals/modal-details/modal-details';
import { ModalConfirm } from './modals/modal-confirm/modal-confirm';
import { ModalEdit } from './modals/modal-edit/modal-edit';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-page',
  imports: [Sidemenu, Header, Footer, ModalDetails, ModalConfirm, ModalEdit, CommonModule],
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

  openModalDetail(product: IProduct): void {
    this.showModalDetail = true;
    this.producDetail = product;
  }

  closeModalDetail(): void {
    this.showModalDetail = false;
  }

  openModalConfirmDelete(): void {
    this.showModalConfirm = true;
  }

  closeModalConfirmDelete(): void {
    this.showModalConfirm = false;
  }

  openModalEdit(): void {
    this.showModalEdit = true;
  }

  closeModalEdit(): void {
    this.showModalEdit = false;
  }
}
