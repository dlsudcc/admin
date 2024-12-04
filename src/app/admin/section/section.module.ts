import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionRoutingModule } from './section-routing.module';
import { AddSectionComponent } from './add-section/add-section.component';
import { ListingPageSectionComponent } from './listing-page-section/listing-page-section.component';
import { ShowSectionComponent } from './show-section/show-section.component';
import { UpdateSectionComponent } from './update-section/update-section.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddSectionComponent,
    ListingPageSectionComponent,
    ShowSectionComponent,
    UpdateSectionComponent
  ],
  imports: [
    CommonModule,
    SectionRoutingModule,
    SharedModule
  ]
})
export class SectionModule { }
