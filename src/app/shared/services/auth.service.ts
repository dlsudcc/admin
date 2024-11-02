import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { LoginForm } from 'src/app/login/login';
import { CookieService } from 'ngx-cookie-service';
import { CONFIG_SESSION_EXPIRATION_HOURS } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseService: FirebaseService, private cookieService: CookieService) { }
  verifyAuth() {
    return this.cookieService.get('user');
  }
  async login(loginForm: LoginForm) {
    try {
      const user = await this.firebaseService.login(loginForm.email, loginForm.password);
      const cookieExpiration = new Date();
      cookieExpiration.setHours(cookieExpiration.getHours() + CONFIG_SESSION_EXPIRATION_HOURS);
      this.cookieService.set('user', JSON.stringify(user), cookieExpiration);
      console.log(this.cookieService.get('user'));
      return user; // Return user details
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Propagate the error
    }
  }
  logOut() {
    this.cookieService.delete('user');
  }
}
