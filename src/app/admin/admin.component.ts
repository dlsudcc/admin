import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { ToastService } from '../shared/services/toast.service';
import { ToastType } from '../shared/components/toast/toast';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isSidebarOpen = false;

  constructor(public toastService: ToastService) {}

  ngOnInit() {
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSideBar() {
    this.isSidebarOpen = false;
  }
  
}
