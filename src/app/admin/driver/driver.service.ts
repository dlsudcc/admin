import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { DriverListingOption } from './driver-listing-option';
import { DriverForm } from './driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService extends ApiService {
  drivers(listingOption: DriverListingOption) {
    this.setParameters(
      {
        'sort': listingOption?.sort,
        'search': listingOption?.search,
        'page': listingOption?.page
      },true
    )
    return this.getRequest('drivers');
  }

  exportTable(listingOption: DriverListingOption) {
    this.setParameters(
      {
        'sort': listingOption?.sort,
        'search': listingOption?.search,
        'page': listingOption?.page,
        'export': listingOption?.export
      },true
    )
    this.export('drivers');
  }
  addDriver(form: DriverForm) {
    return this.postRequest('driver_new', form.toSubmit());
  }
  updateDriver(form: DriverForm) {
    return this.putRequest('driver_update/'+form.id, form.toSubmit());
  }
  departments(params) {
    this.setParameters(params, true);
    return this.getRequest('driver_departments/');
  }
  restrictions() {
    return this.getRequest('driver_restrictions/');
  }
  students(params) {
    this.setParameters(params, true);
    return this.getRequest('driver_students/');
  }
  years(params) {
    this.setParameters(params, true);
    return this.getRequest('driver_years/');
  }
  barangays(params) {
    this.setParameters(params, true);
    return this.getRequest('driver_barangays/');
  }
  get profilePictureUrl() {
    return this.apiUrl;
  }
  show(id: number) {
    return this.getRequest('driver_show/'+id);
  }
  verify(id: number) {
    return this.putRequest('driver_verify/'+id, null);
  }
  delete(id: number) {
    return this.deleteRequest('driver_delete/'+id);
  }
}
