import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, icons } from 'lucide-angular';
import { LoadingComponent } from './components/loading/loading.component';
import { ToastComponent } from './components/toast/toast.component';
import { LoadingService } from './services/loading.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ThArrowComponent } from './components/th-arrow/th-arrow.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NullablePipe } from './pipes/nullable.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    LoadingComponent,
    ToastComponent,
    ThArrowComponent,
    PaginationComponent,
    NullablePipe,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    LucideAngularModule.pick(icons),
  ],
  exports: [
    LucideAngularModule,
    HttpClientModule,
    LoadingComponent,
    ToastComponent,
    CommonModule,
    FormsModule,
    PaginationComponent,
    ReactiveFormsModule,
    ThArrowComponent,
    NullablePipe
  ],
  providers: [
    LoadingService
  ]
})
export class SharedModule { }
