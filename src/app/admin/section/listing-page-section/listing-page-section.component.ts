import { Component, OnInit } from '@angular/core';
import { SectionListingOption } from '../section-listing-option';
import { ListingResult } from 'src/app/shared/utils/listing-result';
import { DepartmentDTO } from '../../department/department';
import { debounceTime, Subject } from 'rxjs';
import { SectionDTO } from '../section';
import { DepartmentService } from '../../department/department.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AddSectionComponent } from '../add-section/add-section.component';
import { SectionService } from '../section.service';
import { ShowSectionComponent } from '../show-section/show-section.component';

@Component({
  selector: 'app-listing-page-section',
  templateUrl: './listing-page-section.component.html',
  styleUrls: ['./listing-page-section.component.scss']
})
export class ListingPageSectionComponent implements OnInit {
  listingOption: SectionListingOption = new SectionListingOption();
  listingResult: ListingResult = new ListingResult();
  private searchTextChanged = new Subject<string>(); // Subject to handle search text changes
  departments: DepartmentDTO[] = [];
  department = new DepartmentDTO();
  isDropdownLoading = false;
  sections: SectionDTO[] = [];
  section = new SectionDTO();
  tableHeaders = [
    { name: '', label: '', class:"" },
    { name: 'department', label: 'Department', class:"col-6" },
    { name: 'name', label: 'Name', class:"col-6" },
  ]
  isLoading = false;
  constructor(
    private sectionService: SectionService,
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
    this.sectionService.sections(this.listingOption).subscribe({
      next: (result: ListingResult) => {
        this.sections = this.section.sectionsMapper(result.data);
        this.listingResult = result;
      }, complete: () => {
        this.isLoading = false;
      }
    });
  }
  selectDepartment(department) {
    this.listingOption.departments.push(department);
    this.departments = [];
    this.loadContent();
  }
  searchDepartments(department: string) {
    this.departments = [];
    this.isDropdownLoading = true;
    if (department) {
      this.sectionService.departments({
        department: department,
        includeSection: true,
        exclude: this.listingOption?.departments.length > 0 ? this.listingOption.departments?.map(it=>it.id) : null
      }).subscribe({
        next: (it) => {
          this.departments = this.department.departmentsMapper(it);
          this.isDropdownLoading = false;
        }
      });
    }
  }
  removeDepartment(department: DepartmentDTO) {
    this.listingOption.departments = this.listingOption.departments.filter (it => it.id != department.id);
    this.loadContent();
  }
  onSearchChanged(): void {
    this.searchTextChanged.next(this.listingOption.search);
  }
  addNew () {
    const modalRef = this.modalService.open(AddSectionComponent, {
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
  view (section: SectionDTO) {
    const modalRef = this.modalService.open(ShowSectionComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      animation: false
    });
    console.log(section);
    modalRef.componentInstance.section = section;
    modalRef.result.then((result) => {
      if (result) {
        this.loadContent();
      }
    }).catch((error) => {
      console.error(error);
    });
  }
}
