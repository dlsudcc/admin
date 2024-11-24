import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { VehicleForm } from './vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends ApiService {
  makes(params) {
    this.setParameters(params, true);
    return this.getRequest('vehicle_makes/');
  }
  bodyTypes(params) {
    this.setParameters(params, true);
    return this.getRequest('vehicle_bodyTypes/');
  }
  add(form: VehicleForm) {
    const formData = new FormData();
    formData.append('orFile', form.orDocument);
    formData.append('crFile', form.crDocument);
    if (form.plateNumber) {
      formData.append('plateNumber', form?.plateNumber);
    }
    if (form.engineNumber) {
      formData.append('engineNumber', form?.engineNumber);
    }
    if (form.chassisNumber) {
      formData.append('chassisNumber', form?.chassisNumber);
    }
    if (form.series) {
      formData.append('series', form?.series);
    }
    if (form.color) {
      formData.append('color', form?.color);
    }
    if (form.make) {
      formData.append('make', form?.make.id.toString());
    }
    if (form.bodyType) {
      formData.append('bodyType', form.bodyType?.id.toString());
    }
    if (form.orNumber) {
      formData.append('orNumber', form?.orNumber);
    }
    if (form.orDate) {
      formData.append('orDate', form?.orDate.toString());
    }
    if (form.crNumber) {
      formData.append('crNumber', form?.crNumber);
    }
    if (form.crDate) {
      formData.append('crDate', form?.crDate.toString());
    }
    formData.append('netDisplacement', form.netDisplacement.toString());
    formData.append('netCapacity', form.netCapacity.toString());
    return this.uploadPostRequest('vehicle_new', formData);
  }

  updateVehicle(form: VehicleForm, id) {
    return this.putRequest('vehicle_update/'+id, form.toSubmit());
  }
  delete(id: number) {
    return this.deleteRequest('vehicle_delete/'+id);
  }
}
