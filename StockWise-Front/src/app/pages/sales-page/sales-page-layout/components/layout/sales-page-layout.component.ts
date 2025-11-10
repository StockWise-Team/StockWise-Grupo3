import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SalesPageTopbarComponent } from '../topbar/sales-page-topbar.component';
import { SalesPageSidebarComponent } from '../sidebar/sales-page-sidebar.component';

@Component({
  selector: 'sales-page-layout',
  standalone: true,
  imports: [RouterOutlet, SalesPageTopbarComponent, SalesPageSidebarComponent],
  templateUrl: './sales-page-layout.component.html',
  styleUrl: './sales-page-layout.component.css',
})
export class SalesPageLayoutComponent {}
