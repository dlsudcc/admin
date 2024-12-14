import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingPageStudentComponent } from './listing-page-student/listing-page-student.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { ShowPageStudentComponent } from './show-page-student/show-page-student.component';
import { UpdatePageStudentComponent } from './update-page-student/update-page-student.component';

const routes: Routes = [
  {path: '', component: ListingPageStudentComponent, canActivate: [AuthGuard]},
  {path: ':id', component: ShowPageStudentComponent, canActivate: [AuthGuard]},
  {path: ':id/update', component: UpdatePageStudentComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
