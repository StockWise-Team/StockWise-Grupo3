import { Component, Input } from '@angular/core';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';
import { ProfileIcon } from "@app/icons";

@Component({
  selector: 'app-header',
  imports: [Breadcrumbs, ProfileIcon],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Input() fullName: string = 'sin nombre';
}
