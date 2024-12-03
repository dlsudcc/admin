import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { ListingPageDepartmentComponent } from './listing-page-department/listing-page-department.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { UpdateDepartmentComponent } from './update-department/update-department.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShowPageDepartmentComponent } from './show-page-department/show-page-department.component';


@NgModule({
  declarations: [
    ListingPageDepartmentComponent,
    AddDepartmentComponent,
    UpdateDepartmentComponent,
    ShowPageDepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SharedModule
  ]
})
export class DepartmentModule { }
