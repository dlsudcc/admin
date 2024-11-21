import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { DocumentForm } from './document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends ApiService {

  addStudentDocument(form: DocumentForm) {
    const formData = new FormData();
    formData.append('file', form.file);
    formData.append('studentId', form.student.id.toString());
    formData.append('otherType', form.otherType);
    formData.append('remarks', form.remarks);
    formData.append('type', form.type);
    return this.uploadPostRequest('student_document_new', formData);
  }

  addDriverDocument(form: DocumentForm) {
    const formData = new FormData();
    formData.append('file', form.file);
    formData.append('isNewDriver', "true".toString());
    formData.append('otherType', form.otherType);
    formData.append('remarks', form.remarks ?? '');
    formData.append('type', form.type);
    return this.uploadPostRequest('driver_document_new', formData);
  }

  updateStudentDocument(form: DocumentForm, id) {
    return this.putRequest('student_document_update/'+id, form);
  }
  updateDriverDocument(form: DocumentForm, id) {
    return this.putRequest('driver_document_update/'+id, form);
  }
  delete (id) {
    return this.deleteRequest('document_delete/'+id);
  }
  downloadFile (document) {
    this.download(document.location);
  }
}
