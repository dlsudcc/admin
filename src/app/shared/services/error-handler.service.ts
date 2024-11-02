import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }
  handleFormError(data: any, dtoErrors: any) {
    if (data.status == 422 && data.error.errors) {
      dtoErrors = {};
      for (const field in data.error.errors) {
        if (data.error.errors.hasOwnProperty(field)) {
          dtoErrors[field] = data.error.errors[field][0];
        }
      }
      return dtoErrors;
    }
    return {};
  }
}
