import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { ListingPageDriverComponent } from './listing-page-driver/listing-page-driver.component';
import { AddPageDriverComponent } from './add-page-driver/add-page-driver.component';
import { UpdatePageDriverComponent } from './update-page-driver/update-page-driver.component';
import { ShowPageDriverComponent } from './show-page-driver/show-page-driver.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListingPageDriverComponent,
    AddPageDriverComponent,
    UpdatePageDriverComponent,
    ShowPageDriverComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DriverRoutingModule
  ]
})
export class DriverModule { }
