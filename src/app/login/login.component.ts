import { Component } from '@angular/core';
import { LoginForm } from './login';
import { Router } from '@angular/router';
import { LoadingService } from '../shared/services/loading.service';
import { AuthService } from '../shared/services/auth.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { ToastService } from '../shared/services/toast.service';
import { ToastType } from '../shared/components/toast/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: LoginForm = new LoginForm();
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
    // private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService,
    private toastService: ToastService
  ) {

  }
  ngOnInit(): void {
    if (this.authService.verifyAuth()) {
      this.loadingService.hide();
      this.router.navigate(['admin']);
    }
    return;
  }
  async onSubmit() {
    this.loadingService.show();
    if (this.authService.verifyAuth()) {
      this.loadingService.hide();
      this.router.navigate(['admin']);
    } else {
      
      this.authService.login(this.form).subscribe({
        next: (result) => {
          this.authService.setCookie('user', result);
          this.loadingService.hide();
          this.toastService.add("Success", "Login Successful", ToastType.SUCCESS);
          this.router.navigate(['admin']);
        }, error: (result) => {
          this.loadingService.hide();
          this.form.errors = this.form.handleFormError(result, this.form);
        }
      });
      // this.firebaseService.add(this.form, "users").then(result=> {

      // });
      // this.authService.logInAdmin(this.user).subscribe({
      //   next: (result) => {
      //     this.authService.setAuth(result);
      //     this.authService.updateDisplayName();
      //     this.notificationService.openModal({
      //       type: NotificationType.SUCCESSLOGIN,
      //       message: "Welcome "+localStorage.getItem('displayName'),
      //       header: null,
      //       size: 'sm',
      //       timer: 2000})
      //       this.loadingService.hide();
      //       this.router.navigate(['admin/dashboard']);
      //       return;
          
      //   }, error: (error) => {
      //     this.loadingService.hide();
      //     this.user.errors = this.errorHandlerService.handleFormError(error, this.user.errors);
      //   }, complete: () => {
      //     this.loadingService.hide();
      //     this.router.navigate(['admin/dashboard']);
      //   }
      // });
      }
  }
}
