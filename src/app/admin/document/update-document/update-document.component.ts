import { Component } from '@angular/core';
import { DocumentForm, DocumentType, DocumentTypeLabels } from '../document';
import { DocumentService } from '../document.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/components/toast/toast';

@Component({
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.scss']
})
export class UpdateDocumentComponent {
  form: DocumentForm = new DocumentForm();
  isStudent = false;
  isLoading = false;
  isFileOver = false;
  DocumentType = DocumentType;
  DocumentTypeLabels = DocumentTypeLabels;
  constructor(
    private documentService: DocumentService,
    private modal: NgbActiveModal,
    private toastService: ToastService,
  ) {
  }
  submitForm() {
    this.isLoading = true;
    const api = this.isStudent ? this.documentService.updateStudentDocument(this.form, this.form.id) : this.documentService.updateStudentDocument(this.form, this.form.id); 
    api.subscribe(
      {
        next: (result) => {
          this.toastService.add("Success", "Document Updated", ToastType.SUCCESS);
          this.isLoading = false;
          this.modal.close(result);
        },
        error : (error) => {
          this.form.errors = this.form.handleFormError(error, this.form);
          this.isLoading = false;
          this.form.otherErrors.forEach(it => {
            this.toastService.add("Error", it, ToastType.ERROR)
          })
        }, complete: () => {
          this.isLoading = false;
        }
      }
    )
  }
  close() {
    this.modal.close(false);
  }
}
