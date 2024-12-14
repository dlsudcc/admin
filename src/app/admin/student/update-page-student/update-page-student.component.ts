import { Component, OnInit } from '@angular/core';
import { StudentDTO, StudentForm, StudentStatus } from '../student';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/components/toast/toast';
import { StudentService } from '../student.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { DocumentDTO, DocumentType, DocumentTypeLabels } from '../../document/document';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentService } from '../../document/document.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogTypes, ConfirmationResponseTypes } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog';
import { AddDocumentComponent } from '../../document/add-document/add-document.component';
import { UpdateDocumentComponent } from '../../document/update-document/update-document.component';
import { DepartmentService } from '../../department/department.service';
import { DepartmentDTO } from '../../department/department';
import { SectionService } from '../../section/section.service';
import { SectionDTO } from '../../section/section';
import { GuardianDTO, RelationshipType, RelationshipTypeLabels } from '../../guardian/guardian';
import { AddGuardianComponent } from '../../guardian/add-guardian/add-guardian.component';
import { UpdateGuardianComponent } from '../../guardian/update-guardian/update-guardian.component';
import { GuardianService } from '../../guardian/guardian.service';

@Component({
  selector: 'app-update-page-student',
  templateUrl: './update-page-student.component.html',
  styleUrls: ['./update-page-student.component.scss']
})
export class UpdatePageStudentComponent implements OnInit{

  student = new StudentForm();
  department = new DepartmentDTO();
  departments: DepartmentDTO[] = [];
  section = new SectionDTO();
  sections: SectionDTO[] = [];
  id: number;
  isLoading = false;
  StudentStatus = StudentStatus;
  DocumentTypeLabels = DocumentTypeLabels;
  DocumentType = DocumentType;
  RelationshipTypeLabels = RelationshipTypeLabels;
  RelationshipType = RelationshipType;
  isDropdownLoading = false;
  tableHeaders = [
    { name: '', label: '', class:"" },
    { name: 'type', label: 'Type', class:"col-4" },
    { name: 'remarks', label: 'Remarks', class:"col-4" },
    { name: '', label: 'Action', class:"col-4" }
  ]
  guardianHeaders = [
    { name: '', label: '', class:"" },
    { name: 'relationship', label: 'Relationship', class:"col-2" },
    { name: 'lastName', label: 'Last Name', class:"col-2" },
    { name: 'firstName', label: 'First Name', class:"col-2" },
    { name: 'middleName', label: 'Middle Name', class:"col-2 " },
    { name: 'contactNumber', label: 'ContactNumber', class:"col-2" },
    { name: '', label: 'Action', class:"col-2" }
  ]
  constructor(
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private route: Router,
    private studentService: StudentService,
    private loadingService: LoadingService,
    private documentService: DocumentService,
    private departmentService: DepartmentService,
    private sectionService: SectionService,
    private modalService: NgbModal,
    private guardianService: GuardianService
  ) {

  }
  get apiUrl() {
    return this.studentService.profilePictureUrl;
  }
  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (!this.id) {
      this.toastService.add("Error", "This driver is not viewable", ToastType.ERROR);
      this.route.navigate(['404']);
      return;
    }
    this.loadContent();
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
  addGuardian() {
    const modalRef = this.modalService.open(AddGuardianComponent, {
      backdrop: 'static',
      keyboard: true,
      animation: false
    });
    modalRef.componentInstance.form.student = this.student;
    modalRef.result.then((result) => {
      if (result) {
        this.loadContent();
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  deleteGuardian(guardian: GuardianDTO) {
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
        this.guardianService.delete(guardian.id).subscribe({next:()=> {
          this.toastService.add("Success", "Guardian Deleted", ToastType.ERROR);
          this.loadContent();
        }, complete: ()=>{
          this.isLoading = false;
        }});
      }
    });
  }
  updateGuardian(guardian: GuardianDTO) {
    const modalRef = this.modalService.open(UpdateGuardianComponent, {
      backdrop: 'static',
      keyboard: true,
      animation: false
    });
    modalRef.componentInstance.form.fill(guardian);
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
          let student = new StudentDTO();
          student = student.studentMapper(result);
          this.student.fill(student);
        },
        error: (error) => {
          const form = new StudentForm();
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
  selectDepartment(department) {
    this.departmentService.show(department.id).subscribe({
      next: (result) => {
        this.student.department = this.department.departmentMapper(result);
      }
    })
  }
  searchDepartments(department) {
    this.departments = [];
    this.isDropdownLoading = true;
    if (department) {
      this.studentService.departments({
        department: department,
        // exclude: this.form.department?.id
      }).subscribe({
        next: (it) => {
          this.departments = this.department.departmentsMapper(it);
          this.isDropdownLoading = false;
        }
      });
    }
  }
  selectSection(section) {
    this.sectionService.show(section.id).subscribe({
      next: (result) => {
        this.student.section = this.section.sectionMapper(result);
      }
    })
  }
  searchSection(section) {
    this.sections = [];
    this.isDropdownLoading = true;
    if (section) {
      this.studentService.sections({
        section: section,
        department: this.student.department.id,
        // exclude: this.form.department?.id
      }).subscribe({
        next: (it) => {
          this.sections = this.section.sectionsMapper(it);
          this.isDropdownLoading = false;
        }
      });
    }
  }

}
