import { Component } from '@angular/core';
import { DepartmentForm } from '../department';
import { DepartmentService } from '../department.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/components/toast/toast';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent {
  form: DepartmentForm = new DepartmentForm();
  isLoading = false;
  constructor(
    private departmentService: DepartmentService,
    private modal: NgbActiveModal,
    private toastService: ToastService,
  ) {
  }
  close() {
    this.modal.close(false);
  }
  submitForm() {
    this.isLoading = true;
    this.departmentService.addDepartment(this.form).subscribe(
      {
        next: (result) => {
          console.log(result);
          this.toastService.add("Success", "Department Created", ToastType.SUCCESS);
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
