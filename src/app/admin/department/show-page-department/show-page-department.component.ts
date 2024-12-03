import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogTypes, ConfirmationResponseTypes } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/components/toast/toast';
import { DepartmentService } from '../department.service';
import { DepartmentDTO, DepartmentForm } from '../department';
import { UpdateDepartmentComponent } from '../update-department/update-department.component';

@Component({
  selector: 'app-show-page-department',
  templateUrl: './show-page-department.component.html',
  styleUrls: ['./show-page-department.component.scss']
})
export class ShowPageDepartmentComponent implements OnInit {
  id: number;
  department: DepartmentDTO;
  isLoading = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) {

  }
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id) {
      this.toastService.add("Error", "This department is not viewable", ToastType.ERROR);
      this.router.navigate(['404']);
      return;
    }
    this.loadContent();
  }
  loadContent() {
    this.isLoading = true;
    this.loadingService.show();
    this.departmentService.show(this.id).subscribe(
      {
        next: (result) => {
          this.department = new DepartmentDTO();
          this.department = this.department.departmentMapper(result);
        },
        error: (error) => {
          const form = new DepartmentForm();
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
    const modalRef = this.modalService.open(UpdateDepartmentComponent, {
      backdrop: 'static',
      keyboard: false,
      animation: false
    });
    modalRef.componentInstance.data = this.department;
    modalRef.result.then((result) => {
      if (result) {
        this.loadContent();
      }
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
        this.departmentService.delete(this.department.id).subscribe({next:()=> {
          this.toastService.add("Success", "Department Deleted", ToastType.ERROR);
          this.isLoading = false;
          this.router.navigate(['department']);
        }, complete: ()=>{
          this.isLoading = false;
        }});
      }
    });
  }
}
 {

}
