import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogTypes, ConfirmationResponseTypes } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog';
import { ToastType } from 'src/app/shared/components/toast/toast';
import { StudentDTO, StudentForm, StudentStatus } from '../student';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { DocumentListingOption } from '../../document/document-listing-option';
import { DocumentDTO, DocumentType, DocumentTypeLabels } from '../../document/document';
import { AddDocumentComponent } from '../../document/add-document/add-document.component';
import { DocumentService } from '../../document/document.service';
import { UpdateDocumentComponent } from '../../document/update-document/update-document.component';

@Component({
  selector: 'app-show-page-student',
  templateUrl: './show-page-student.component.html',
  styleUrls: ['./show-page-student.component.scss']
})
export class ShowPageStudentComponent implements OnInit {
  id: number;
  student: StudentDTO;
  listingOption = new DocumentListingOption();
  DocumentTypeLabels = DocumentTypeLabels;
  DocumentType = DocumentType;
  StudentStatus = StudentStatus;
  isLoading = false;
  tableHeaders = [
    { name: '', label: '', class:"" },
    { name: 'type', label: 'Type', class:"col-4" },
    { name: 'remarks', label: 'Remarks', class:"col-4" },
    { name: '', label: 'Action', class:"col-4" }
  ]
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private documentService: DocumentService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) {

  }
  get apiUrl() {
    return this.studentService.profilePictureUrl;
  }
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id) {
      this.toastService.add("Error", "This student is not viewable", ToastType.ERROR);
      this.router.navigate(['404']);
      return;
    }
    this.loadContent();
  }
  verify() {
    this.studentService.verify(this.id).subscribe(
      {
        next: () => {
          this.toastService.add("Success", "Student Verified", ToastType.SUCCESS);
          this.loadContent();
        },
        error: (error) => {
          const form = new StudentForm();
          form.errors = form.handleFormError(error, form);
          form.otherErrors.forEach(it => {
            this.toastService.add("Error", it, ToastType.ERROR)
          })
        },
        complete: () => {
          this.loadingService.hide();
          this.isLoading = false;
        }
      }
    )
  }
  viewDocument(document: DocumentDTO){
    this.documentService.download(document.location);
  }
  deleteDocument(document: DocumentDTO) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'md',
      centered: true,
      animation: false
    });
    modalRef.componentInstance.message = "Are you sure you want to delete?";
    modalRef.componentInstance.type = ConfirmationDialogTypes.YESNO;
    modalRef.result.then((result) => {
      if (result == ConfirmationResponseTypes.YES) {
        this.isLoading = true;
        this.documentService.delete(document.id).subscribe({next:()=> {
          this.toastService.add("Success", "Document Deleted", ToastType.ERROR);
          this.loadContent();
        }, complete: ()=>{
          this.isLoading = false;
        }});
      }
    });
  }
  addDocument() {
    const modalRef = this.modalService.open(AddDocumentComponent, {
      backdrop: 'static',
      keyboard: true,
      animation: false
    });
    modalRef.componentInstance.isStudent = true;
    modalRef.componentInstance.form.student = this.student;
    modalRef.result.then((result) => {
      if (result) {
        this.loadContent();
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  loadContent() {
    this.isLoading = true;
    this.loadingService.show();
    this.studentService.show(this.id).subscribe(
      {
        next: (result) => {
          this.student = new StudentDTO();
          this.student = this.student.studentMapper(result);
        },
        error: (error) => {
          const form = new StudentForm();
          form.errors = form.handleFormError(error, form);
          form.otherErrors.forEach(it => {
            this.toastService.add("Error", it, ToastType.ERROR)
          })
          this.router.navigate(['404']);
        },
        complete: () => {
          this.loadingService.hide();
          this.isLoading = false;
        }
      }
    )
  }
  update() {
    console.log("SD");
  }
  updateDocument(document: DocumentDTO) {
    const modalRef = this.modalService.open(UpdateDocumentComponent, {
      backdrop: 'static',
      keyboard: true,
      animation: false
    });
    modalRef.componentInstance.isStudent = true;
    modalRef.componentInstance.form.fill(document);
    modalRef.componentInstance.form.student = this.student;
    modalRef.result.then((result) => {
      if (result) {
        this.loadContent();
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  delete() {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'md',
      centered: true,
      animation: false
    });
    modalRef.componentInstance.message = "Are you sure you want to delete?";
    modalRef.componentInstance.type = ConfirmationDialogTypes.YESNO;
    modalRef.result.then((result) => {
      if (result == ConfirmationResponseTypes.YES) {
        this.isLoading = true;
        this.studentService.delete(this.student.id).subscribe({next:()=> {
          this.toastService.add("Success", "User Deleted", ToastType.ERROR);
          this.isLoading = false;
          this.router.navigate(['user']);
        }, complete: ()=>{
          this.isLoading = false;
        }});
      }
    });
  }
}
