import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Roles } from '../../enums/rolesEnum';
import {
  BoxIcon,
  CartIcon,
  HouseIcon,
  TableIcon,
  BellIcon,
  ProfileIcon,
  CrossIcon,
  AddUserIcon,
} from '../../icons';

@Component({
  selector: 'app-sidemenu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidemenu.html',
  styleUrl: './sidemenu.css',
})
export class Sidemenu {
  Roles = Roles; //Expone el enum al template

  @Input() role: Roles = Roles.ADMIN;
}
