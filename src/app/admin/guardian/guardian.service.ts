import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { GuardianForm } from './guardian';

@Injectable({
  providedIn: 'root'
})
export class GuardianService extends ApiService {

  delete (id) {
    return this.deleteRequest('guardian_delete/'+id);
  }
  addGuardian(form: GuardianForm) {
    return this.postRequest('guardian_new', form.toSubmit());
  }
  updateGuardian(form: GuardianForm) {
    return this.putRequest('guardian_update/'+form.id, form.toSubmit());
  }
}
