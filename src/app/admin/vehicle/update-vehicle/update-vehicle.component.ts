import { Component } from '@angular/core';
import { BodyTypeDTO, MakeDTO, VehicleForm } from '../vehicle';
import { VehicleService } from '../vehicle.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/components/toast/toast';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.scss']
})
export class UpdateVehicleComponent {
  form: VehicleForm = new VehicleForm();
  isLoading = false;
  isDropdownLoading = false;
  makes: MakeDTO[] = [];
  make: MakeDTO = new MakeDTO();
  bodyTypes: BodyTypeDTO[] = [];
  bodyType: BodyTypeDTO = new BodyTypeDTO();
  constructor(
    private vehicleService: VehicleService,
    private modal: NgbActiveModal,
    private toastService: ToastService,
  ) {
  }
  submitForm() {
    this.isLoading = true;
    const api = this.vehicleService.updateVehicle(this.form, this.form.id);
    api.subscribe(
      {
        next: (result) => {
          this.toastService.add("Success", "Vehicle Updated", ToastType.SUCCESS);
          this.isLoading = false;
          this.modal.close(result);
        },
        error : (error) => {
          this.form.errors = this.form.handleFormError(error, this.form);
          this.isLoading = false;
          this.form.otherErrors.forEach(it => {
            this.toastService.add("Error", it, ToastType.ERROR)
          })
        }, complete: () => {
          this.isLoading = false;
        }
      }
    )
  }
  preventExtraDecimals(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Allow digits, one dot, and restrict decimals to two places
    if (
      !/^\d*(\.\d{0,2})?$/.test(value + event.key) && // Adding the key to the value
      event.key !== 'Backspace' && // Allow backspace
      event.key !== 'Delete' && // Allow delete
      event.key !== 'ArrowLeft' && // Allow navigation
      event.key !== 'ArrowRight'
    ) {
      event.preventDefault(); // Block invalid input
    }
  }
  close(){
    this.modal.close(false);
  }
  selectMake(make) {
    this.form.make = make;
  }
  searchMakes(make) {
    this.makes = [];
    this.isDropdownLoading = true;
    this.vehicleService.makes({
      make: make,
      // exclude: this.form.student?.id
    }).subscribe({
      next: (it) => {
        this.makes = this.make.makesMapper(it);
        this.isDropdownLoading = false;
      }
    });
  }
  selectBodyType(bodyType) {
    this.form.bodyType = bodyType;
  }
  searchBodyTypes(bodyType) {
    this.bodyTypes = [];
    this.isDropdownLoading = true;
    this.vehicleService.bodyTypes({
      bodyType: bodyType,
      // exclude: this.form.student?.id
    }).subscribe({
      next: (it) => {
        this.bodyTypes = this.bodyType.bodyTypesMapper(it);
        this.isDropdownLoading = false;
      }
    });
  }
}
