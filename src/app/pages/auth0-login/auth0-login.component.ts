import { Component } from '@angular/core';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth0-login',
  templateUrl: './auth0-login.component.html'
})
export class Auth0LoginComponent {
  // Inject the authentication service into your component through the constructor
  constructor(public auth: AuthService) {
    if(!auth.isAuthenticated$){
      this.auth.loginWithRedirect()
    }     
}
}