import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { Page404Component } from './page404/page404.component';
import { AddVehicleComponent } from './vehicle/add-vehicle/add-vehicle.component';
import { UpdateVehicleComponent } from './vehicle/update-vehicle/update-vehicle.component';
import { AddGuardianComponent } from './guardian/add-guardian/add-guardian.component';
import { UpdateGuardianComponent } from './guardian/update-guardian/update-guardian.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AdminComponent,
    Page404Component,
    AddVehicleComponent,
    UpdateVehicleComponent,
    AddGuardianComponent,
    UpdateGuardianComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
