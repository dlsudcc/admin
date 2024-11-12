import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  handleFormError(data, dtoErrors) {
    if (data.status == 422 && data.error.errors) {
      dtoErrors = {};
      for (const field in data.error.errors) {
        if (data.error.errors[field]) {
          dtoErrors[field] = data.error.errors[field][0];
        }
      }
      return dtoErrors;
    }
    return {};
  }
}
