import { Injectable } from '@angular/core';
import { LoginForm } from 'src/app/login/login';
import { CookieService } from 'ngx-cookie-service';
import { CONFIG_SESSION_EXPIRATION_HOURS } from 'src/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  login(loginForm: LoginForm) {
    return this.postRequest('login', {email: loginForm.email, password: loginForm.password, userName: loginForm.email});
  }
}
