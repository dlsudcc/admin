import { Component, OnInit } from '@angular/core';
import { DriverService } from '../driver.service';
import { StudentService } from '../../student/student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentService } from '../../document/document.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverDTO, DriverForm, RestrictionDTO } from '../driver';
import { StudentDTO } from '../../student/student';
import { DocumentDTO, DocumentType, DocumentTypeLabels } from '../../document/document';
import { UpdateDocumentComponent } from '../../document/update-document/update-document.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogTypes, ConfirmationResponseTypes } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog';
import { ToastType } from 'src/app/shared/components/toast/toast';
import { AddDocumentComponent } from '../../document/add-document/add-document.component';

@Component({
  selector: 'app-update-page-driver',
  templateUrl: './update-page-driver.component.html',
  styleUrls: ['./update-page-driver.component.scss']
})
export class UpdatePageDriverComponent implements OnInit {
  form: DriverForm = new DriverForm();
  DocumentType = DocumentType;
  driver: DriverDTO = new DriverDTO();
  students: StudentDTO[] = [];
  student: StudentDTO = new StudentDTO();
  restrictions: RestrictionDTO[] = [];
  restriction: RestrictionDTO = new RestrictionDTO();
  isDropdownLoading = false;
  DocumentTypeLabels = DocumentTypeLabels;
  id: number;
  isLoading = false;
  tableHeaders = [
    { name: '', label: '', class:"" },
    { name: 'type', label: 'Type', class:"col-4" },
    { name: 'remarks', label: 'Remarks', class:"col-4" },
    { name: '', label: 'Action', class:"col-4" }
  ]
  constructor(
    private driverService: DriverService,
    private studentService: StudentService,
    private modalService: NgbModal,
    private documentService: DocumentService,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (!this.id) {
      this.toastService.add("Error", "This driver is not viewable", ToastType.ERROR);
      this.route.navigate(['404']);
      return;
    }
    this.driverService.restrictions().subscribe({
      next: (result) => {
        this.restrictions = this.restriction.restrictionsMapper(result);
        this.loadContent();
      }
    })
  }
  loadContent() {
    this.isLoading = true;
    this.loadingService.show();
    this.driverService.show(this.id).subscribe(
      {
        next: (result) => {
          this.driver = new DriverDTO();
          this.driver = this.driver.driverMapper(result);
          this.form.fill(this.driver);
          this.form.fillRestrictions(this.restrictions, this.driver.restrictions)
        },
        error: (error) => {
          const form = new DriverForm();
          form.errors = form.handleFormError(error, form);
          form.otherErrors.forEach(it => {
            this.toastService.add("Error", it, ToastType.ERROR)
          })
          this.route.navigate(['404']);
        },
        complete: () => {
          this.loadingService.hide();
          this.isLoading = false;
        }
      }
    )
  }
  selectStudent(student) {
    this.studentService.show(student.id).subscribe({
      next: (result) => {
        this.form.student = this.student.studentMapper(result);
      }
    })
  }
  searchStudents(student) {
    this.students = [];
    this.isDropdownLoading = true;
    this.driverService.students({
      student: student,
      // exclude: this.form.student?.id
    }).subscribe({
      next: (it) => {
        this.students = this.student.studentsMapper(it);
        console.log(this.students);
        this.isDropdownLoading = false;
      }
    });
  }
  viewDocument(document: DocumentDTO) {
    this.documentService.download(document.location);
  }
  updateDocument(document: DocumentDTO) {
    const modalRef = this.modalService.open(UpdateDocumentComponent, {
      backdrop: 'static',
      keyboard: true,
      animation: false
    });
    modalRef.componentInstance.isStudent = false;
    modalRef.componentInstance.form.fill(document);
    modalRef.componentInstance.form.student = this.student;
    modalRef.result.then((result) => {
      if (result) {
        this.form.updateDocument(result);
      }
    }).catch((error) => {
      console.error(error);
    });
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
        this.documentService.delete (document.id).subscribe({next:()=> {
          this.toastService.add("Success", "Document Deleted", ToastType.ERROR);
          this.isLoading = false;
          this.form.documents = this.form.documents.filter(it => it.id !== document.id);
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
    modalRef.componentInstance.isStudent = false;
    modalRef.result.then((result) => {
      if (result) {
        this.form.documents.push(result);
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  submitForm() {
    this.loadingService.show();
    this.isLoading = true;
    this.driverService.updateDriver(this.form).subscribe({
      next: (result) => {
        this.toastService.add("Success", "Driver Updated Successfully", ToastType.SUCCESS);
        const res = new DriverDTO();
        const driver = res.driverMapper(result);
        this.route.navigate(['admin/driver/'+driver.id])
      },
      error: (result) => {
        this.isLoading = false;
        this.toastService.add("Error", "Something went wrong. Check the form for details", ToastType.ERROR);
        this.form.errors = this.form.handleFormError(result, this.form);
        this.loadingService.hide();
      }, complete: () => {
        this.isLoading = false;
        this.loadingService.hide();
      }
    })
  }
  cancel() {
    this.route.navigate(['admin/driver/'+this.driver.id])
  }
  preventExtraDecimals(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Allow digits, one dot, and restrict decimals to two places
    if (
      !/^\d*(\.\d{0,2})?$/.test(value + event.key) && // Adding the key to the value
      event.key !== 'Backspace' && // Allow backspace
      event.key !== 'Delete' && // Allow delete
      event.key !== 'ArrowLeft' && // Allow navigation
      event.key !== 'ArrowRight'
    ) {
      event.preventDefault(); // Block invalid input
    }
  }
}
