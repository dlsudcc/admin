import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isSidebarOpen = false;
  navigations = [
    {name: 'users', icon: 'users', link: 'user', description: 'Users'}
  ];
  ngOnInit(): void {
  }
}
