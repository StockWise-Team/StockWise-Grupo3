import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { SalesPageSalesService } from '../../services/sales-page-sales.service';
import { Product, SaleItem } from '../../models/product.model';

@Component({
  selector: 'sales-page-sale-form',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, CurrencyPipe],
  templateUrl: './sales-page-sale-form.component.html',
  styleUrl: './sales-page-sale-form.component.css'
})
export class SalesPageSaleFormComponent {
  private readonly salesSvc = inject(SalesPageSalesService);
  private readonly router = inject(Router);

  searchQuery = '';
  suggestions: Product[] = [];
  items: SaleItem[] = [];

  get totalAmount(): number {
    return this.items.reduce((sum, item) => sum + item.subtotal, 0);
  }

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.suggestions = [];
      return;
    }

    this.salesSvc.searchProducts(this.searchQuery).subscribe({
      next: (products) => {
        this.suggestions = products;
      },
      error: (err) => {
        console.error('Error searching products:', err);
        this.suggestions = [];
      }
    });
  }

  onSelectProduct(product: Product) {
    // Check if already added
    const existing = this.items.find(it => it.product.id === product.id);
    if (existing) {
      existing.quantity++;
      existing.subtotal = existing.quantity * existing.product.unitPrice;
    } else {
      this.items.push({
        product,
        quantity: 1,
        subtotal: product.unitPrice,
      });
    }
    // Clear search
    this.searchQuery = '';
    this.suggestions = [];
  }

  increaseQty(index: number) {
    const item = this.items[index];
    item.quantity++;
    item.subtotal = item.quantity * item.product.unitPrice;
  }

  decreaseQty(index: number) {
    const item = this.items[index];
    if (item.quantity > 1) {
      item.quantity--;
      item.subtotal = item.quantity * item.product.unitPrice;
    } else {
      this.removeItem(index);
    }
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  onCancelSale() {
    this.router.navigate(['/sales-page/sales']);
  }

  onFinishSale() {
    if (!this.items.length) return;

    this.salesSvc.createOngoingSale(this.items).subscribe({
      next: (response) => {
        // Sale completed successfully
        this.router.navigate(['/sales-page/sales']);
      },
      error: (err) => {
        // Handle sale error
        alert('Error al registrar la venta. Por favor intente nuevamente.');
      }
    });
  }
}
