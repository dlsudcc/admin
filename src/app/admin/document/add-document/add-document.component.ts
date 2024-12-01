import { Component, ElementRef, ViewChild } from '@angular/core';
import { DocumentDTO, DocumentForm, DocumentType, DocumentTypeLabels } from '../document';
import { DocumentService } from '../document.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/components/toast/toast';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent {
  form: DocumentForm = new DocumentForm();
  isStudent = false;
  isLoading = false;
  isFileOver = false;
  DocumentType = DocumentType;
  DocumentTypeLabels = DocumentTypeLabels;
  maxSizeInBytes = 2 * 1024 * 1024; // 2MB in bytes
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  constructor(
    private documentService: DocumentService,
    private modal: NgbActiveModal,
    private toastService: ToastService,
  ) {
  }
  close() {
    this.modal.close(false);
  }

  onSelectFile(): void {
    this.fileInput.nativeElement.click();
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isFileOver = true;
  }
  onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        if (this.isFileTypeValid(input.files[0])) {
          if (this.isFileSizeValid(input.files[0])) {
            this.form.file = input.files[0];
          } else {
            this.toastService.add("Invalid File", "Invalid file size. Maximum file size is 2MB", ToastType.ERROR);
          }
        } else {
          this.toastService.add("Invalid File", "Invalid file format", ToastType.ERROR)
        }
      }
  }
  private isFileTypeValid(file: File): boolean {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
      return validTypes.includes(file.type);
  }
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isFileOver = false;
  }

  // Handle file drop event
  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        const droppedFile = event.dataTransfer.files[0];
        if (this.isFileTypeValid(droppedFile)) {
          if (this.isFileSizeValid(droppedFile)) {
            this.form.file = droppedFile["File"];
          } else {
            this.toastService.add("Invalid File", "Invalid file size. Maximum file size is 2MB", ToastType.ERROR);
          }
        } else {
          this.toastService.add("Invalid File", "Invalid file format", ToastType.ERROR)
        }
        event.dataTransfer.clearData();
        this.isFileOver = false;
    }
  }
  private isFileSizeValid(file: File): boolean {
      return file.size <= this.maxSizeInBytes;
  }

  submitForm() {
    this.isLoading = true;
    const api = this.isStudent ? this.documentService.addStudentDocument(this.form) : this.documentService.addDriverDocument(this.form);
    api.subscribe(
      {
        next: (result: DocumentDTO) => {
          this.toastService.add("Success", "Document Added", ToastType.SUCCESS);
          this.isLoading = false;
          result.isNew = true;
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
}
