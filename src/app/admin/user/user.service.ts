import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { UserDTO, UserForm } from './user';
import { map, Observable } from 'rxjs';
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
  updateUser(id: Number, form: UserForm) {
    return this.putRequest('user_update/'+id, form);
  }
  show(id: Number) {
    return this.getRequest('user_show/'+id);
  }
}
