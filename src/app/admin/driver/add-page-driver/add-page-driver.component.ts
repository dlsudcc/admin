import { Component, OnInit } from '@angular/core';
import { DriverDTO, DriverForm, RestrictionDTO } from '../driver';
import { DriverService } from '../driver.service';
import { DocumentDTO, DocumentType, DocumentTypeLabels } from '../../document/document';
import { StudentDTO } from '../../student/student';
import { StudentService } from '../../student/student.service';
import { AddDocumentComponent } from '../../document/add-document/add-document.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentService } from '../../document/document.service';
import { UpdateDocumentComponent } from '../../document/update-document/update-document.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogTypes, ConfirmationResponseTypes } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog';
import { ToastType } from 'src/app/shared/components/toast/toast';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { Route, Router } from '@angular/router';
import { AddVehicleComponent } from '../../vehicle/add-vehicle/add-vehicle.component';
import { VehicleDTO } from '../../vehicle/vehicle';
import { UpdateVehicleComponent } from '../../vehicle/update-vehicle/update-vehicle.component';
import { VehicleService } from '../../vehicle/vehicle.service';

@Component({
  selector: 'app-add-page-driver',
  templateUrl: './add-page-driver.component.html',
  styleUrls: ['./add-page-driver.component.scss']
})
export class AddPageDriverComponent implements OnInit {
  form: DriverForm = new DriverForm();
  DocumentType = DocumentType;
  driver: DriverDTO = new DriverDTO();
  students: StudentDTO[] = [];
  student: StudentDTO = new StudentDTO();
  restrictions: RestrictionDTO[] = [];
  restriction: RestrictionDTO = new RestrictionDTO();
  isDropdownLoading = false;
  DocumentTypeLabels = DocumentTypeLabels;
  isLoading = false;
  tableHeaders = [
    { name: '', label: '', class:"" },
    { name: 'type', label: 'Type', class:"col-4" },
    { name: 'remarks', label: 'Remarks', class:"col-4" },
    { name: '', label: 'Action', class:"col-4" }
  ]
  vehicleTableHeaders = [
    { name: '', label: '', class:"" },
    { name: 'make', label: 'Make', class:"col-2" },
    { name: 'series', label: 'Series', class:"col-2" },
    { name: 'color', label: 'Color', class:"col-2" },
    { name: 'plateNumber', label: 'Plate #', class:"col-2" },
    { name: '', label: 'Action', class:"col-4" }
  ]
  constructor(
    private driverService: DriverService,
    private studentService: StudentService,
    private modalService: NgbModal,
    private documentService: DocumentService,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private vehicleService: VehicleService,
    private route: Router
  ) {
  }
  ngOnInit(): void {
    this.driverService.restrictions().subscribe({
      next: (result) => {
        this.form.restrictions = this.restriction.restrictionsMapper(result);
      }
    })
  }
  addVehicle() {
    const modalRef = this.modalService.open(AddVehicleComponent, {
      backdrop: 'static',
      keyboard: true,
      animation: false
    });
    modalRef.result.then((result) => {
      if (result) {
        this.form.vehicles.push(result);
      }
    }).catch((error) => {
      console.error(error);
    });
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
  updateVehicle(vehicle: VehicleDTO) {
    const modalRef = this.modalService.open(UpdateVehicleComponent, {
      backdrop: 'static',
      keyboard: true,
      animation: false
    });
    modalRef.componentInstance.form.fill(vehicle);
    modalRef.result.then((result) => {
      if (result) {
        this.form.updateVehicle(result);
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  deleteVehicle(vehicle: VehicleDTO) {
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
        this.vehicleService.delete(vehicle.id).subscribe({next:()=> {
          this.toastService.add("Success", "Vehicle Deleted", ToastType.ERROR);
          this.isLoading = false;
          this.form.vehicles = this.form.vehicles.filter(it => it.id !== vehicle.id);
        }, complete: ()=>{
          this.isLoading = false;
        }});
      }
    });
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
    this.driverService.addDriver(this.form).subscribe({
      next: (result) => {
        this.toastService.add("Success", "Driver Created Successfully", ToastType.SUCCESS);
        const driver = this.driver.driverMapper(result);
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
