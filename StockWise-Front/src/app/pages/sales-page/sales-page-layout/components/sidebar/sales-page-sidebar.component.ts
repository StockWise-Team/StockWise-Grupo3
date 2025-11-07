import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'sales-page-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sales-page-sidebar.component.html',
  styleUrl: './sales-page-sidebar.component.css',
})
export class SalesPageSidebarComponent {}
