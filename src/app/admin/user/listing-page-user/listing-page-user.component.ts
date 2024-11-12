import { Component, OnInit } from '@angular/core';
import { UserListingOption } from '../user-listing-options';
import { UserService } from '../user.service';
import { UserDTO } from '../user';
import { debounceTime, Subject } from 'rxjs';
import { ListingResult } from 'src/app/shared/utils/listing-result';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../add-user/add-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing-page-user',
  templateUrl: './listing-page-user.component.html',
  styleUrls: ['./listing-page-user.component.scss']
})
export class ListingPageUserComponent implements OnInit {
  listingOption: UserListingOption = new UserListingOption();
  listingResult: ListingResult = new ListingResult();
  private searchTextChanged = new Subject<string>(); // Subject to handle search text changes
  users: UserDTO[] = [];
  user = new UserDTO();
  tableHeaders = [
    { name: '', label: '', class:"" },
    { name: 'lastName', label: 'Last Name', class:"col-2" },
    { name: 'firstName', label: 'First Name', class:"col-2" },
    { name: 'middleName', label: 'Middle Name', class:"col-2" },
    { name: 'userName', label: 'Username', class:"col-2" },
    { name: 'email', label: 'Email', class:"col-2" },
    { name: 'dateCreated', label: 'Date Created', class:"col-2" },
  ]
  isLoading = false;
  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private route: Router
  ) {
  }
  ngOnInit(): void {
    this.searchTextChanged
      .pipe(debounceTime(200)) // 300 ms delay
      .subscribe(() => {
        this.loadContent();
    });
    this.loadContent();
  }
  loadContent() {
    this.isLoading = true;
    this.userService.users(this.listingOption).subscribe({
      next: (result: ListingResult) => {
        this.users = this.user.usersMapper(result.data);
        this.listingResult = result;
      }, complete: () => {
        this.isLoading = false;
      }
    });
  }
  onSearchChanged(): void {
    this.searchTextChanged.next(this.listingOption.search);
  }
  addNew () {
    const modalRef = this.modalService.open(AddUserComponent, { 
      backdrop: 'static',  
      keyboard: false,
      animation: false
    });
    modalRef.result.then((result) => {
      if (result) {
        this.loadContent();
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  async navigate(page) {
    this.listingOption.page = page;
    this.loadContent();
  }
  sortBy (name) {
    if (this.listingOption.sort) {
      this.listingOption.sort = (this.listingOption.sort[0] == '-' ? '+' : '-') + name;
    } else {
      this.listingOption.sort = '+' + name;
    }
    this.loadContent();
  }
  view (user: UserDTO) {
    this.route.navigate(['admin/user/'+user.id]);
  }
}
