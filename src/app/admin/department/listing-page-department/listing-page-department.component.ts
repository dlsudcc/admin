import { Component, OnInit } from '@angular/core';
import { ListingResult } from 'src/app/shared/utils/listing-result';
import { DepartmentDTO } from '../department';
import { DepartmentService } from '../department.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { DepartmentListingOption } from '../department-listing-option';

@Component({
  selector: 'app-listing-page-department',
  templateUrl: './listing-page-department.component.html',
  styleUrls: ['./listing-page-department.component.scss']
})
export class ListingPageDepartmentComponent implements OnInit {
  listingOption: DepartmentListingOption = new DepartmentListingOption();
  listingResult: ListingResult = new ListingResult();
  private searchTextChanged = new Subject<string>(); // Subject to handle search text changes
  departments: DepartmentDTO[] = [];
  department = new DepartmentDTO();
  tableHeaders = [
    { name: '', label: '', class:"" },
    { name: 'code', label: 'Code', class:"col-4" },
    { name: 'name', label: 'Name', class:"col-4" },
    { name: 'description', label: 'Description', class:"col-4" }
  ]
  isLoading = false;
  constructor(
    private departmentService: DepartmentService,
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
    this.departmentService.departments(this.listingOption).subscribe({
      next: (result: ListingResult) => {
        this.departments = this.department.departmentsMapper(result.data);
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
    const modalRef = this.modalService.open(AddDepartmentComponent, {
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
  view (department: DepartmentDTO) {
    this.route.navigate(['admin/department/'+department.id]);
  }
}
