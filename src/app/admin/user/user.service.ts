import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { UserForm } from './user';
import { UserListingOption } from './user-listing-options';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {
  
  users(listingOption: UserListingOption) {
    this.setParameters(
      {
        'sort': listingOption?.sort,
        'search': listingOption?.search,
        'page': listingOption?.page
      },
      
    )
    return this.getRequest('users');
  }
  addUser(form: UserForm) {
    return this.postRequest('user_new', form);
  }
  updateUser(id: number, form: UserForm) {
    return this.putRequest('user_update/'+id, form);
  }
  delete(id: number) {
    return this.deleteRequest('user_delete/'+id);
  }
  show(id: number) {
    return this.getRequest('user_show/'+id);
  }
}
