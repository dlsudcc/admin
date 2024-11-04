import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
