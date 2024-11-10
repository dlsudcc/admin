import { Component } from '@angular/core';
import { UserForm } from '../user';
import { UserService } from '../user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/components/toast/toast';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  form: UserForm = new UserForm();
  isLoading = false;
  constructor(
    private userService: UserService,
    private modal: NgbActiveModal,
    private toastService: ToastService,
  ) {
  }
  close() {
    this.modal.close(false);
  }
  submitForm() {
    this.isLoading = true;
    this.userService.addUser(this.form).subscribe(
      {
        next: (result) => {
          console.log(result);
          this.toastService.add("Success", "User Created", ToastType.SUCCESS);
          this.isLoading = false;
          this.modal.close(true);
        },
        error : (error) => {
          this.form.errors = this.form.handleFormError(error, this.form);
          this.isLoading = false;
        }, complete: () => {
          this.isLoading = false;
        }
      }
    )
  }
}
