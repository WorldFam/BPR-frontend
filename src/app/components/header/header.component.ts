import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  route : string
  constructor(private router: Router) {
    console.log(router.url);
    this.route = router.url  
  }

}
