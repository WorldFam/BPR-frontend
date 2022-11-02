import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  title = 'UMM-Dashboard';
  isAuthenticated = false

  constructor(public auth : AuthService){   
    this.auth.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated
      },
      error: (msg) => {
        console.log(msg)
      }
    })
  }
}
