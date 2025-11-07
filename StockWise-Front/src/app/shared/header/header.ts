import { Component } from '@angular/core';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-header',
  imports: [Breadcrumbs],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
