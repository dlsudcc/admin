import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingPageUserComponent } from './listing-page-user/listing-page-user.component';

const routes: Routes = [
  {path: '', component: ListingPageUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
