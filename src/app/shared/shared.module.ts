import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, icons } from 'lucide-angular';
import { LoadingComponent } from './components/loading/loading.component';
import { ToastComponent } from './components/toast/toast.component';
import { LoadingService } from './services/loading.service';

@NgModule({
  declarations: [
    LoadingComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    LucideAngularModule.pick(icons),
  ],
  exports: [
    LucideAngularModule,
    LoadingComponent,
    ToastComponent,
  ],
  providers: [
    LoadingService
  ]
})
export class SharedModule { }
