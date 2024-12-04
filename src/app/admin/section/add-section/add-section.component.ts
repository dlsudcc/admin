import { Component } from '@angular/core';
import { SectionForm } from '../section';
import { SectionService } from '../section.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/components/toast/toast';
import { DepartmentService } from '../../department/department.service';
import { DepartmentDTO } from '../../department/department';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.scss']
})
export class AddSectionComponent {
  form: SectionForm = new SectionForm();
  isLoading = false;
  departments: DepartmentDTO[] = [];
  department: DepartmentDTO = new DepartmentDTO();
  isDropdownLoading = false;
  constructor(
    private sectionService: SectionService,
    private modal: NgbActiveModal,
    private toastService: ToastService,
    private departmentService: DepartmentService,
  ) {
  }
  selectDepartment(department) {
    this.departmentService.show(department.id).subscribe({
      next: (result) => {
        this.form.department = this.department.departmentMapper(result);
      }
    })
  }
  searchDepartments(department) {
    this.departments = [];
    this.isDropdownLoading = true;
    if (department) {
      this.sectionService.departments({
        department: department,
        // exclude: this.form.department?.id
      }).subscribe({
        next: (it) => {
          this.departments = this.department.departmentsMapper(it);
          console.log(this.departments);
          this.isDropdownLoading = false;
        }
      });
    }
  }
  close() {
    this.modal.close(false);
  }
  submitForm() {
    this.isLoading = true;
    console.log("sd");
    this.sectionService.addSection(this.form).subscribe(
      {
        next: (result) => {
          console.log(result);
          this.toastService.add("Success", "Section Created", ToastType.SUCCESS);
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
