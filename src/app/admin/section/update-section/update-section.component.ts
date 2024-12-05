import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SectionDTO, SectionForm } from '../section';
import { DepartmentDTO } from '../../department/department';
import { SectionService } from '../section.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/services/toast.service';
import { DepartmentService } from '../../department/department.service';
import { ToastType } from 'src/app/shared/components/toast/toast';

@Component({
  selector: 'app-update-section',
  templateUrl: './update-section.component.html',
  styleUrls: ['./update-section.component.scss']
})
export class UpdateSectionComponent {
  @Input() form: SectionForm;
  isLoading = false;
  departments: DepartmentDTO[] = [];
  department: DepartmentDTO = new DepartmentDTO();
  isDropdownLoading = false;
  @Output() formResult = new EventEmitter<SectionDTO>();
  constructor(
    private sectionService: SectionService,
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
          this.isDropdownLoading = false;
        }
      });
    }
  }
  cancel() {
    this.formResult.emit(null);
  }
  submitForm() {
    this.isLoading = true;
    this.sectionService.updateSection(this.form.id, this.form.toSubmit()).subscribe(
      {
        next: (result) => {
          let sectionDTO = new SectionDTO();
          this.toastService.add("Success", "Section Updated", ToastType.SUCCESS);
          this.isLoading = false;
          // this.modal.close(true);
          this.formResult.emit(sectionDTO.sectionMapper(result));
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
