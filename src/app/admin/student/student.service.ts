import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { StudentListingOption } from './student-listing-option';
import { StudentForm } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends ApiService {

  students(listingOption: StudentListingOption) {
    this.setParameters(
      {
        'sort': listingOption?.sort,
        'search': listingOption?.search,
        'page': listingOption?.page,
        'department': listingOption?.departments?.map(it=>it.id),
        'year': listingOption?.years?.map(it=>it.year),
        'status': listingOption?.status,
        'barangay': listingOption?.barangays?.map(it=>it.barangay),
        'isEnrolledAsDriver': listingOption.isEnrolledAsDriver,
      },true
    )
    return this.getRequest('students');
  }
  exportTable(listingOption: StudentListingOption) {
    this.setParameters(
      {
        'sort': listingOption?.sort,
        'search': listingOption?.search,
        'page': listingOption?.page,
        'department': listingOption?.departments?.map(it=>it.id),
        'year': listingOption?.years?.map(it=>it.year),
        'status': listingOption?.status,
        'export': listingOption?.export,
        'barangay': listingOption?.barangays?.map(it=>it.barangay),
        'isEnrolledAsDriver': listingOption.isEnrolledAsDriver,
      },true
    )
    this.export('students');
  }
  addStudent(form: StudentForm) {
    return this.postRequest('student_new', form);
  }
  updateStudent(id: number, form: StudentForm) {
    return this.putRequest('student_update/'+id, form);
  }
  delete(id: number) {
    return this.deleteRequest('student_delete/'+id);
  }
  show(id: number) {
    return this.getRequest('student_show/'+id);
  }
  verify(id: number) {
    return this.putRequest('student_verify/'+id, null);
  }
  departments(params) {
    this.setParameters(params, true);
    return this.getRequest('student_departments/');
  }
  years(params) {
    this.setParameters(params, true);
    return this.getRequest('student_years/');
  }
  barangays(params) {
    this.setParameters(params, true);
    return this.getRequest('student_barangays/');
  }
  get profilePictureUrl() {
    return this.apiUrl;
  }
}
