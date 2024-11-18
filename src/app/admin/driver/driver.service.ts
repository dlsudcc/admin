import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { DriverListingOption } from './driver-listing-options';

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
}
