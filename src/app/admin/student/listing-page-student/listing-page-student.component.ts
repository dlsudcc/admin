import { Component, OnInit } from '@angular/core';
import { StudentListingOption } from '../student-listing-option';
import { ListingResult } from 'src/app/shared/utils/listing-result';
import { debounceTime, Subject } from 'rxjs';
import { BloodType, StudentDTO, StudentStatus, StudentStatusLabels } from '../student';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { DepartmentDTO } from '../../department/department';
import { SectionDTO } from '../../section/section';

@Component({
  selector: 'app-listing-page-student',
  templateUrl: './listing-page-student.component.html',
  styleUrls: ['./listing-page-student.component.scss']
})
export class ListingPageStudentComponent implements OnInit {
  listingOption: StudentListingOption = new StudentListingOption();
  listingResult: ListingResult = new ListingResult();
  private searchTextChanged = new Subject<string>(); // Subject to handle search text changes
  StudentStatus = StudentStatus;
  StudentStatusLabels = StudentStatusLabels;
  isDropdownLoading = false;
  students: StudentDTO [] = [];
  departments: DepartmentDTO [] = [];
  department: DepartmentDTO = new DepartmentDTO();
  years = [];
  bloodTypes: BloodType [] = [];
  sections: SectionDTO [] = [];
  barangays = [];
  cities: [] = [];
  provinces: [] = [];
  regions: [] = [];
  isEnrolledAsDriver: boolean;
  filter = true;
  student = new StudentDTO();
  tableHeaders = [
    { name: '', label: '', class:"" },
    { name: 'lastName', label: 'Last Name', class:"col-2" },
    { name: 'firstName', label: 'First Name', class:"col-2" },
    { name: 'middleName', label: 'Middle Name', class:"col-2" },
    { name: 'year', label: 'Year', class:"col-2" },
    { name: 'department', label: 'Department', class:"col-2" },
    { name: 'barangay', label: 'Barangay', class:"col-1" },
    { name: 'section', label: 'Section', class:"col-2" },
    { name: 'dateCreated', label: 'Date Created', class:"col-2" },
  ]
  isLoading = false;
  constructor(
    private studentService: StudentService,
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
  toggleFilter() {
    this.filter = !this.filter;
  }
  export (type:string) {
    this.listingOption.export = type;
    this.studentService.exportTable(this.listingOption);
  }
  selectDepartment(department) {
    this.listingOption.departments.push(department);
    this.departments = [];
    this.loadContent();
  }
  searchDepartments(department: string) {
    this.departments = [];
    this.isDropdownLoading = true;
    this.studentService.departments({
      department: department,
      exclude: this.listingOption?.departments.length > 0 ? this.listingOption.departments?.map(it=>it.id) : null
    }).subscribe({
      next: (it) => {
        this.departments = this.department.departmentsMapper(it);
        this.isDropdownLoading = false;
      }
    });
  }
  removeDepartment(department: DepartmentDTO) {
    this.listingOption.departments = this.listingOption.departments.filter (it => it.id != department.id);
    this.loadContent();
  }
  selectYear(year) {
    this.listingOption.years.push(year);
    this.years = [];
    this.loadContent();
  }
  searchYears(year: string) {
    this.years = [];
    this.isDropdownLoading = true;
    this.studentService.years({
      year: year,
      exclude: this.listingOption?.years.length > 0 ? this.listingOption.years?.map(it=>it.year) : null
    }).subscribe({
      next: (it: []) => {
        this.years = it;
        this.isDropdownLoading = false;
      }
    });
  }
  removeYear(year) {
    this.listingOption.years = this.listingOption.years.filter (it => it.year != year.year);
    this.loadContent();
  }
  selectBarangay(barangay) {
    this.listingOption.barangays.push(barangay);
    this.years = [];
    this.loadContent();
  }
  searchBarangays(barangay: string) {
    this.years = [];
    this.isDropdownLoading = true;
    this.studentService.barangays({
      barangay: barangay,
      exclude: this.listingOption?.barangays.length > 0 ? this.listingOption.barangays?.map(it=>it.barangay) : null
    }).subscribe({
      next: (it: []) => {
        this.barangays = it;
        this.isDropdownLoading = false;
      }
    });
  }
  removeBarangay(barangay) {
    this.listingOption.barangays = this.listingOption.barangays.filter (it => it.barangay != barangay.barangay);
    this.loadContent();
  }
  loadContent() {
    this.isLoading = true;
    this.studentService.students(this.listingOption).subscribe({
      next: (result: ListingResult) => {
        this.students = this.student.studentsMapper(result.data);
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
    this.route.navigate(['new']);
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
  view (student: StudentDTO) {
    this.route.navigate(['admin/student/'+student.id]);
  }
}
