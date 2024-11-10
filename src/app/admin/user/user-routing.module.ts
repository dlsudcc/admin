import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingPageUserComponent } from './listing-page-user/listing-page-user.component';
import { ShowPageUserComponent } from './show-page-user/show-page-user.component';

const routes: Routes = [
  {path: '', component: ListingPageUserComponent},
  {path: ':id', component: ShowPageUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
