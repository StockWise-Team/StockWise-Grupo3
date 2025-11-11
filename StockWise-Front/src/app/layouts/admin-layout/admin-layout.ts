import { Component } from '@angular/core';
import { Sidemenu } from '../../shared/sidemenu/sidemenu';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { RouterOutlet } from '@angular/router';
import { Roles } from '../../enums/rolesEnum';

@Component({
  selector: 'app-admin-layout',
  imports: [Sidemenu, Header, Footer, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  adminRole:Roles = Roles.ADMIN;
}
