import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { ToastService } from '../shared/services/toast.service';
import { ToastType } from '../shared/components/toast/toast';
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

  closeSideBar() {
    this.isSidebarOpen = false;
  }
  
}
