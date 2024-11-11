import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDTO, UserForm } from '../user';
import { UserService } from '../user.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogTypes, ConfirmationResponseTypes } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/components/toast/toast';

@Component({
  selector: 'app-show-page-user',
  templateUrl: './show-page-user.component.html',
  styleUrls: ['./show-page-user.component.scss']
})
export class ShowPageUserComponent implements OnInit {
  id: Number;
  user: UserDTO;
  isLoading = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) {
    
  }
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id) {

    }
    this.loadContent();
  }
  loadContent() {
    this.isLoading = true;
    this.loadingService.show();
    this.userService.show(this.id).subscribe(
      {
        next: (result) => {
          this.user = new UserDTO();
          this.user = this.user.userMapper(result);
        },
        complete: () => {
          this.loadingService.hide();
          this.isLoading = false;
        }
      }
    )
  }
  update() {
    const modalRef = this.modalService.open(UpdateUserComponent, { 
      backdrop: 'static',  
      keyboard: false,
      animation: false
    });
    modalRef.componentInstance.data = this.user;
    modalRef.result.then((result) => {
      if (result) {
        this.loadContent();
      }
    }).catch((error) => {
    });
  }
  delete() {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { 
      backdrop: 'static',  
      keyboard: false,
      size: 'md',
      centered: true,
      animation: false
    });
    modalRef.componentInstance.message = "Are you sure you want to delete?";
    modalRef.componentInstance.type = ConfirmationDialogTypes.YESNO;
    modalRef.result.then((result) => {
      console.log(result);
      if (result == ConfirmationResponseTypes.YES) {
        this.isLoading = true;
        this.userService.delete(this.user.id).subscribe({next:(result)=> {
          this.toastService.add("Success", "User Deleted", ToastType.ERROR);
          this.isLoading = false;
          this.router.navigate(['user']);
        }, complete: ()=>{
          this.isLoading = false;
        }});
      }
    }).catch((error) => {
    });
  }
}
