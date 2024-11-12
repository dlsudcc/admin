import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { ToastType } from '../components/toast/toast';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private toastService: ToastService,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // Replace with your actual authentication check
      const isAuthenticated = this.isAuthenticated();
  
      if (!isAuthenticated) {
        this.toastService.add('Invalid Authentication', 'Session Expired, please log in', ToastType.ERROR)
        this.router.navigate(['/login']); // Redirect to a login page or access denied
        return false;
      }
  
      return true;
  }
  

  private isAuthenticated(): boolean {
    return !!this.cookieService.get('user');
  }
}
