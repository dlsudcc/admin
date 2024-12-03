import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { ListingPageDepartmentComponent } from './listing-page-department/listing-page-department.component';
import { ShowPageDepartmentComponent } from './show-page-department/show-page-department.component';

const routes: Routes = [
  {path: '', component: ListingPageDepartmentComponent, canActivate: [AuthGuard]},
  {path: ':id', component: ShowPageDepartmentComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
