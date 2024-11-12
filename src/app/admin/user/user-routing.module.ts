import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingPageUserComponent } from './listing-page-user/listing-page-user.component';
import { ShowPageUserComponent } from './show-page-user/show-page-user.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {path: '', component: ListingPageUserComponent, canActivate: [AuthGuard]},
  {path: ':id', component: ShowPageUserComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
