import { Routes } from '@angular/router';
import { SalesPageLayoutComponent } from './pages/sales-page/sales-page-layout/components/layout/sales-page-layout.component';
import { SalesPageSalesTableComponent } from './pages/sales-page/sales-page-sales/components/sales-table/sales-page-sales-table.component';
import { SalesPageSaleFormComponent } from './pages/sales-page/sales-page-sales/components/sale-form/sales-page-sale-form.component';
import { SalesPageProductsTableComponent } from './pages/sales-page/sales-page-products/components/products-table/sales-page-products-table.component';
import { Login } from './auth/login/login';
import { HomePage } from './pages/home-page/home-page';
import { UsersTable } from './shared/users-table/users-table';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { EmployeeLayout } from './layouts/employee-layout/employee-layout';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   template: `
//     <main class="min-h-screen bg-gray-50/50 flex flex-row w-screen">
//       <app-sidemenu />
//       <div class="p-4 flex flex-col w-full">
//         <app-header />
//         <div class="mt-4">
//           <div class="p-8">
//             <h1 class="text-2xl font-bold">Dashboard Principal</h1>
//             <p>Contenido del dashboard principal</p>
//           </div>
//         </div>
//         <div class="fixed bottom-1 left-80 right-0">
//           <app-footer />
//         </div>
//       </div>
//     </main>
//   `,
//   imports: [Sidemenu, Header, Footer]
// })
// export class HomeComponent {}

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
        component: HomePage,
      },
      {
        path: 'users',
        component: UsersTable,
      },
      {
        path: 'cash-register',
        component: HomePage,
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
      { path: 'sales', component: SalesPageSalesTableComponent },
      { path: 'sales/new', component: SalesPageSaleFormComponent },
      { path: 'products', component: SalesPageProductsTableComponent },
    ],
  },
  {
    path: 'sales-page',
    component: SalesPageLayoutComponent,
    children: [{ path: '', redirectTo: 'sales', pathMatch: 'full' }],
  },
];
