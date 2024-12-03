import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { DepartmentForm } from './department';
import { DepartmentListingOption } from './department-listing-option';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends ApiService {

  departments(listingOption: DepartmentListingOption) {
    this.setParameters(
      {
        'sort': listingOption?.sort,
        'search': listingOption?.search,
        'page': listingOption?.page
      },true

    )
    return this.getRequest('departments');
  }
  addDepartment(form: DepartmentForm) {
    return this.postRequest('department_new', form);
  }
  updateDepartment(id: number, form: DepartmentForm) {
    return this.putRequest('department_update/'+id, form);
  }
  delete(id: number) {
    return this.deleteRequest('department_delete/'+id);
  }
  show(id: number) {
    return this.getRequest('department_show/'+id);
  }
}
