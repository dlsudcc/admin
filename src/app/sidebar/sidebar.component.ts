import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isSidebarOpen = false;
  constructor(private router: Router) {}
  navigations = [
    {name: 'users', icon: 'users', link: 'admin/user', description: 'Users'},
    {name: 'graduation-cap', icon: 'graduation-cap', link: 'admin/students', description: 'Students'}
  ];
  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
