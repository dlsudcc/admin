import { Component } from '@angular/core';
import { GuardianDTO, GuardianForm, RelationshipType, RelationshipTypeLabels } from '../guardian';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { GuardianService } from '../guardian.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/components/toast/toast';

@Component({
  selector: 'app-add-guardian',
  templateUrl: './add-guardian.component.html',
  styleUrls: ['./add-guardian.component.scss']
})
export class AddGuardianComponent {
  RelationshipType = RelationshipType;
  RelationshipTypeLabels = RelationshipTypeLabels;
  isLoading = false;
  guardian = new GuardianDTO();
  form = new GuardianForm();
  constructor(
    private modal: NgbActiveModal,
    private loadingService: LoadingService,
    private guardianService: GuardianService,
    private toastService: ToastService
  ) {

  }
  submitForm() {

    this.loadingService.show();
    this.isLoading = true;
    this.guardianService.addGuardian(this.form).subscribe({
      next: (result) => {
        this.toastService.add("Success", "Guardian Created Successfully", ToastType.SUCCESS);
        const guardian = this.guardian.guardianMapper(result);
        this.modal.close(guardian);
      },
      error: (result) => {
        this.isLoading = false;
        this.toastService.add("Error", "Something went wrong. Check the form for details", ToastType.ERROR);
        this.form.errors = this.form.handleFormError(result, this.form);
        this.loadingService.hide();
      }, complete: () => {
        this.isLoading = false;
        this.loadingService.hide();
      }
    })
  }
  close() {
    this.modal.close(false);
  }
  preventExtraDecimals(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Allow digits, Backspace, Delete, and navigation keys
    if (
      !/^\d*$/.test(value + event.key) && // Ensure only whole numbers
      event.key !== 'Backspace' && // Allow backspace
      event.key !== 'Delete' && // Allow delete
      event.key !== 'ArrowLeft' && // Allow navigation
      event.key !== 'ArrowRight' // Allow navigation
    ) {
      event.preventDefault(); // Block invalid input
    }
  }
}
