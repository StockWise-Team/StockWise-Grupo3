import { Component, Input } from '@angular/core';
import { ProfileIcon } from "@app/icons";

@Component({
  selector: 'app-header',
  imports: [ProfileIcon],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Input() fullName: string = 'sin nombre';
}
