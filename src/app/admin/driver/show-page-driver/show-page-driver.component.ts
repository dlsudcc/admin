import { Component, OnInit } from '@angular/core';
import { DriverDTO, DriverForm } from '../driver';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverService } from '../driver.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastType } from 'src/app/shared/components/toast/toast';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogTypes, ConfirmationResponseTypes } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog';
import { DocumentDTO, DocumentType, DocumentTypeLabels } from '../../document/document';
import { DocumentService } from '../../document/document.service';

@Component({
  selector: 'app-show-page-driver',
  templateUrl: './show-page-driver.component.html',
  styleUrls: ['./show-page-driver.component.scss']
})
export class ShowPageDriverComponent implements OnInit {
  id: number;
  driver: DriverDTO;
  DocumentType = DocumentType;
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
    private route: ActivatedRoute,
    private router: Router,
    private driverService: DriverService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private documentService: DocumentService
  ) {

  }
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id) {
      this.toastService.add("Error", "This driver is not viewable", ToastType.ERROR);
      this.router.navigate(['404']);
      return;
    }
    this.loadContent();
  }
  loadContent() {
    this.isLoading = true;
    this.loadingService.show();
    this.driverService.show(this.id).subscribe(
      {
        next: (result) => {
          this.driver = new DriverDTO();
          this.driver = this.driver.driverMapper(result);
          console.log(result);
        },
        error: (error) => {
          const form = new DriverForm();
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
  verify() {
    this.driverService.verify(this.id).subscribe(
      {
        next: () => {
          this.toastService.add("Success", "Driver Verified", ToastType.SUCCESS);
          this.loadContent();
        },
        error: (error) => {
          const form = new DriverForm();
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
  update() {
    this.router.navigate(['admin/driver/'+this.driver.id+'/update'])
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
        this.driverService.delete(this.driver.id).subscribe({next:()=> {
          this.toastService.add("Success", "Driver Deleted", ToastType.ERROR);
          this.isLoading = false;
          this.router.navigate(['driver']);
        }, complete: ()=>{
          this.isLoading = false;
        }});
      }
    });
  }
  viewDocument(document: DocumentDTO) {
    this.documentService.download(document.location);
  }
}
