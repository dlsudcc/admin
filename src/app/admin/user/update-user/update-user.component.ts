import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastType } from 'src/app/shared/components/toast/toast';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserService } from '../user.service';
import { UserDTO, UserForm } from '../user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit{

  form: UserForm = new UserForm();
  data: UserDTO;
  isLoading = false;
  constructor(
    private userService: UserService,
    private modal: NgbActiveModal,
    private toastService: ToastService,
  ) {
  }
  ngOnInit() {
    this.form.fill(this.data);
    console.log(this.form);
  }
  close() {
    this.modal.close(false);
  }
  submitForm() {
    this.isLoading = true;
    this.userService.updateUser(this.form.id, this.form).subscribe(
      {
        next: (result) => {
          console.log(result);
          this.toastService.add("Success", "User Updated", ToastType.SUCCESS);
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
