import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ListingPageUserComponent } from './listing-page-user/listing-page-user.component';
import { ShowPageUserComponent } from './show-page-user/show-page-user.component';


@NgModule({
  declarations: [
    UserComponent,
    ListingPageUserComponent,
    ShowPageUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
