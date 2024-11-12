import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isSidebarOpen = false;
  constructor(private router: Router) {}
  navigations = [
    {name: 'users', icon: 'users', link: 'admin/user', description: 'Users'}
  ];
  ngOnInit(): void {
  }
  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
