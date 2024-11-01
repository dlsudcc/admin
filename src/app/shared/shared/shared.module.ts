import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, icons } from 'lucide-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LucideAngularModule.pick(icons)
  ],
  exports: [
    LucideAngularModule
  ]
})
export class SharedModule { }
