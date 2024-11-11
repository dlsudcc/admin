import { Component } from '@angular/core';
import { ConfirmationDialogTypes, ConfirmationResponseTypes } from './confirmation-dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  type: ConfirmationDialogTypes;
  ConfirmationDialogTypes = ConfirmationDialogTypes;
  ConfirmationResponseType = ConfirmationResponseTypes;
  message: string;
  constructor (private modal: NgbActiveModal) {

  }
  respond(response: ConfirmationResponseTypes) {
    this.modal.close(response);
  }
}
