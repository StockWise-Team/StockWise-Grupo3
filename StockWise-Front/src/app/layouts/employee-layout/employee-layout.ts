import { Component } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { Header } from '../../shared/header/header';
import { Sidemenu } from '../../shared/sidemenu/sidemenu';
import { RouterOutlet } from '@angular/router';
import { Roles } from '../../enums/rolesEnum';

@Component({
  selector: 'app-employee-layout',
  imports: [Sidemenu, Header, Footer, RouterOutlet],
  templateUrl: './employee-layout.html',
  styleUrl: './employee-layout.css',
})
export class EmployeeLayout {
  employeeRole:Roles = Roles.EMPLOYEE;
}
