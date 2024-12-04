import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'student',
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
      },
      {
        path: 'driver',
        loadChildren: () => import('./driver/driver.module').then(m => m.DriverModule)
      },
      {
        path: 'student-document',
        loadChildren: () => import('./document/document.module').then(m => m.DocumentModule)
      },
      {
        path: 'department',
        loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule)
      },
      {
        path: 'section',
        loadChildren: () => import('./section/section.module').then(m => m.SectionModule)
      }, {
        path: '**', component: Page404Component
      }
    ]
  }, {
    path: '404',
    component: Page404Component
  }, {
    path: '**', component: Page404Component
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
