import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingPageDriverComponent } from './listing-page-driver/listing-page-driver.component';
import { ShowPageDriverComponent } from './show-page-driver/show-page-driver.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AddPageDriverComponent } from './add-page-driver/add-page-driver.component';
import { UpdatePageDriverComponent } from './update-page-driver/update-page-driver.component';

const routes: Routes = [
  {path: '', component: ListingPageDriverComponent, canActivate: [AuthGuard]},
  {path: 'new', component: AddPageDriverComponent, canActivate: [AuthGuard]},
  {path: ':id/update', component: UpdatePageDriverComponent, canActivate: [AuthGuard]},
  {path: ':id', component: ShowPageDriverComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
