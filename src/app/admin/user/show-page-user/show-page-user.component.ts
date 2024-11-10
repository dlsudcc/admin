import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDTO, UserForm } from '../user';
import { UserService } from '../user.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateUserComponent } from '../update-user/update-user.component';

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
    private userService: UserService,
    private loadingService: LoadingService,
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
          console.log(this.user);
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
}
