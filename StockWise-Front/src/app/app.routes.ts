import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidemenu } from './shared/sidemenu/sidemenu';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { SalesPageLayoutComponent } from './pages/sales-page/sales-page-layout/components/layout/sales-page-layout.component';
import { SalesPageSalesTableComponent } from './pages/sales-page/sales-page-sales/components/sales-table/sales-page-sales-table.component';
import { SalesPageSaleFormComponent } from './pages/sales-page/sales-page-sales/components/sale-form/sales-page-sale-form.component';
import { SalesPageProductsTableComponent } from './pages/sales-page/sales-page-products/components/products-table/sales-page-products-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <main class="min-h-screen bg-gray-50/50 flex flex-row w-screen">
      <app-sidemenu />
      <div class="p-4 flex flex-col w-full">
        <app-header />
        <div class="mt-4">
          <div class="p-8">
            <h1 class="text-2xl font-bold">Dashboard Principal</h1>
            <p>Contenido del dashboard principal</p>
          </div>
        </div>
        <div class="fixed bottom-1 left-80 right-0">
          <app-footer />
        </div>
      </div>
    </main>
  `,
  imports: [Sidemenu, Header, Footer]
})
export class HomeComponent {}

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'sales-page',
		component: SalesPageLayoutComponent,
		children: [
			{ path: '', redirectTo: 'sales', pathMatch: 'full' },
			{ path: 'sales', component: SalesPageSalesTableComponent },
			{ path: 'sales/new', component: SalesPageSaleFormComponent },
			{ path: 'products', component: SalesPageProductsTableComponent },
		],
	},

];
