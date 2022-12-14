import { Component } from '@angular/core';
import { Router } from '@angular/router';
const DASHBOARD = '/dashboard';
const MAP = '/map';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  route: string;

  constructor(private router: Router) {
    router.url === DASHBOARD || router.url === MAP
      ? (this.route = router.url)
      : (this.route = DASHBOARD);
  }
}
