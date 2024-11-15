import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../shared/guards/auth.guard';

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
        path: 'student', 
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
      },
      { 
        path: 'student-document', 
        loadChildren: () => import('./document/document.module').then(m => m.DocumentModule)
      },
    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
