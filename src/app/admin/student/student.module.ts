import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { AddPageStudentComponent } from './add-page-student/add-student.component';
import { UpdatePageStudentComponent } from './update-page-student/update-page-student.component';
import { ListingPageStudentComponent } from './listing-page-student/listing-page-student.component';
import { ShowPageStudentComponent } from './show-page-student/show-page-student.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddPageStudentComponent,
    UpdatePageStudentComponent,
    ListingPageStudentComponent,
    ShowPageStudentComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule
  ]
})
export class StudentModule { }
