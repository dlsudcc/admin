import { Component, ElementRef, ViewChild } from '@angular/core';
import { BodyTypeDTO, MakeDTO, VehicleDTO, VehicleForm } from '../vehicle';
import { DocumentForm } from '../../document/document';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/components/toast/toast';
import { VehicleService } from '../vehicle.service';
import { DriverDTO } from '../../driver/driver';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent {
  form: VehicleForm = new VehicleForm();
  isLoading = false;
  isDropdownLoading = false;
  isFileOver = false;
  makes: MakeDTO[] = [];
  make: MakeDTO = new MakeDTO();
  bodyTypes: BodyTypeDTO[] = [];
  bodyType: BodyTypeDTO = new BodyTypeDTO();
  DocumentType = DocumentType;
  maxSizeInBytes = 2 * 1024 * 1024; // 2MB in bytes
  @ViewChild('fileInputOR') fileInputOR!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInputCR') fileInputCR!: ElementRef<HTMLInputElement>;
  constructor(
    private toastService: ToastService,
    private vehicleService: VehicleService,
    private modal: NgbActiveModal
  ) {

  }
  submitForm() {
    this.isLoading = true;
    const api = this.vehicleService.add(this.form);
    api.subscribe(
      {
        next: (result: VehicleDTO) => {
          this.toastService.add("Success", "Vehicle Added", ToastType.SUCCESS);
          this.isLoading = false;
          result.isNew = true;
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
  onSelectFile(documentType: 'OR' | 'CR'): void {
    if (documentType == 'OR') {
      this.fileInputOR.nativeElement.click();
      return;
    }
    this.fileInputCR.nativeElement.click();
    return;
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isFileOver = true;
  }
  onFileSelected(event: Event, documentType: 'OR' | 'CR'): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        if (this.isFileTypeValid(input.files[0])) {
          if (this.isFileSizeValid(input.files[0])) {
            if (documentType == 'OR') {
              this.form.orDocument = input.files[0];
            }
            if (documentType == 'CR') {
              this.form.crDocument = input.files[0];
            }
          } else {
            this.toastService.add("Invalid File", "Invalid file size. Maximum file size is 2MB", ToastType.ERROR);
          }
        } else {
          this.toastService.add("Invalid File", "Invalid file format", ToastType.ERROR)
        }
      }
  }
  private isFileTypeValid(file: File): boolean {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
      return validTypes.includes(file.type);
  }
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isFileOver = false;
  }

  // Handle file drop event
  onFileDrop(event: DragEvent, documentType: 'OR' | 'CR'): void {
    event.preventDefault();
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        const droppedFile = event.dataTransfer.files[0];
        if (this.isFileTypeValid(droppedFile)) {
          if (this.isFileSizeValid(droppedFile)) {
            if (documentType == 'OR') {
              this.form.orDocument = droppedFile["File"];
            }
            if (documentType == 'CR') {
              this.form.crDocument = droppedFile["File"];
            }
          } else {
            this.toastService.add("Invalid File", "Invalid file size. Maximum file size is 2MB", ToastType.ERROR);
          }
        } else {
          this.toastService.add("Invalid File", "Invalid file format", ToastType.ERROR)
        }
        event.dataTransfer.clearData();
        this.isFileOver = false;
    }
  }
  private isFileSizeValid(file: File): boolean {
      return file.size <= this.maxSizeInBytes;
  }
}
