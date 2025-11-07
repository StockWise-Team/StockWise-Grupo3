import { Component, OnInit, computed, inject } from '@angular/core';
import { DatePipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { SalesPageSalesService } from '../../services/sales-page-sales.service';

@Component({
  selector: 'sales-page-sales-table',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, CurrencyPipe],
  templateUrl: './sales-page-sales-table.component.html',
  styleUrl: './sales-page-sales-table.component.css'
})
export class SalesPageSalesTableComponent implements OnInit {
  private readonly salesSvc = inject(SalesPageSalesService);
  private readonly router = inject(Router);
  sales = computed(() => this.salesSvc.sales());

  ngOnInit(): void {
    this.salesSvc.loadTodaySales();
  }

  onMakeSale() {
    this.router.navigate(['/sales-page/sales/new']);
  }

  onCancelPrev() {
    this.salesSvc.cancelPreviousSale();
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'Completed': return 'Completada';
      case 'Cancelled': return 'Cancelada';
      case 'Pending': return 'Pendiente';
      default: return status;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
