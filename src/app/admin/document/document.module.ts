import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { AddDocumentComponent } from './add-document/add-document.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateDocumentComponent } from './update-document/update-document.component';


@NgModule({
  declarations: [
    AddDocumentComponent,
    UpdateDocumentComponent
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    SharedModule
  ]
})
export class DocumentModule { }
