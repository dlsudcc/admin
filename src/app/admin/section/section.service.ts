import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { SectionForm } from './section';
import { SectionListingOption } from './section-listing-option';

@Injectable({
  providedIn: 'root'
})
export class SectionService extends ApiService {

  sections(listingOption: SectionListingOption) {
    this.setParameters(
      {
        'sort': listingOption?.sort,
        'search': listingOption?.search,
        'department': listingOption?.departments?.map(it=>it.id),
        'page': listingOption?.page
      },true

    )
    return this.getRequest('sections');
  }
  addSection(form: SectionForm) {
    return this.postRequest('section_new', form.toSubmit());
  }
  updateSection(id: number, form) {
    return this.putRequest('section_update/'+id, form);
  }
  delete(id: number) {
    return this.deleteRequest('section_delete/'+id);
  }
  departments(params) {
    this.setParameters(params, true);
    return this.getRequest('section_departments/');
  }
  show(id: number) {
    return this.getRequest('section_show/'+id);
  }
}
