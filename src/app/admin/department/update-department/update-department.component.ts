import { Component, OnInit } from '@angular/core';
import { DepartmentDTO, DepartmentForm } from '../department';
import { DepartmentService } from '../department.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/components/toast/toast';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.scss']
})
export class UpdateDepartmentComponent implements OnInit {

  form: DepartmentForm = new DepartmentForm();
  data: DepartmentDTO;
  isLoading = false;
  constructor(
    private departmentService: DepartmentService,
    private modal: NgbActiveModal,
    private toastService: ToastService,
  ) {
  }
  ngOnInit() {
    this.form.fill(this.data);
  }
  close() {
    this.modal.close(false);
  }
  submitForm() {
    this.isLoading = true;
    this.departmentService.updateDepartment(this.form.id, this.form).subscribe(
      {
        next: (result) => {
          this.toastService.add("Success", "Department Updated", ToastType.SUCCESS);
          this.isLoading = false;
          this.modal.close(true);
        },
        error : (error) => {
          this.form.errors = this.form.handleFormError(error, this.form);
          this.isLoading = false;
        }, complete: () => {
          this.isLoading = false;
        }
      }
    )
  }
}

