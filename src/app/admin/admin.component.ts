import { Component, OnInit } from '@angular/core';
import { ToastService } from '../shared/services/toast.service';
import { AuthService } from '../shared/services/auth.service';
import { LoadingService } from '../shared/services/loading.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isSidebarOpen = false;

  constructor(
    public toastService: ToastService,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    if (this.authService.verifyAuth()) {
      this.loadingService.hide();
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  get isMobile () {
    return window.innerWidth <= 1023;
  }

  closeSideBar() {
    this.isSidebarOpen = false;
  }
  
}
