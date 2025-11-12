import { Routes } from '@angular/router';
import { SalesPageLayoutComponent } from './pages/sales-page/sales-page-layout/components/layout/sales-page-layout.component';
import { SalesPageSalesTableComponent } from './pages/sales-page/sales-page-sales/components/sales-table/sales-page-sales-table.component';
import { SalesPageSaleFormComponent } from './pages/sales-page/sales-page-sales/components/sale-form/sales-page-sale-form.component';
import { SalesPageProductsTableComponent } from './pages/sales-page/sales-page-products/components/products-table/sales-page-products-table.component';
import { Login } from './auth/login/login';
import { HomePage } from './pages/home-page/home-page';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { EmployeeLayout } from './layouts/employee-layout/employee-layout';
import { StockPage } from './pages/stock-page/stock-page';
import { RegisterClosingsPage } from './pages/register-closings-page/register-closings-page';

export const routes: Routes = [
  { path: '', component: Login },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'sales',
        component: HomePage,
      },
      {
        path: 'products',
        component: HomePage,
      },
      {
        path: 'stock',
        component: StockPage,
      },
      {
        path: 'users',
        component: HomePage,
      },
      {
        path: 'cash-register',
        component: RegisterClosingsPage,
      },
    ],
  },
  {
    path: 'employee',
    component: EmployeeLayout,
    children: [
      {
        path: 'home',
        component: HomePage,
      },
      { 
        path: 'sales', 
        component: SalesPageSalesTableComponent 
      },
      { 
        path: 'sales/new', 
        component: SalesPageSaleFormComponent 
      },
      { 
        path: 'products', 
        component: SalesPageProductsTableComponent
      },
    ],
  },
  // {
  //   path: 'sales-page',
  //   component: SalesPageLayoutComponent,
  //   children: [{ path: '', redirectTo: 'sales', pathMatch: 'full' }],
  // },
];
