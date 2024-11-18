import { Component, OnInit } from '@angular/core';
import { DriverForm, RestrictionDTO } from '../driver';
import { DriverService } from '../driver.service';
import { DocumentDTO, DocumentType, DocumentTypeLabels } from '../../document/document';
import { StudentDTO } from '../../student/student';
import { StudentService } from '../../student/student.service';

@Component({
  selector: 'app-add-page-driver',
  templateUrl: './add-page-driver.component.html',
  styleUrls: ['./add-page-driver.component.scss']
})
export class AddPageDriverComponent implements OnInit {
  form: DriverForm = new DriverForm();
  DocumentType = DocumentType;
  students: StudentDTO[] = [];
  student: StudentDTO = new StudentDTO();
  restrictions: RestrictionDTO[] = [];
  restriction: RestrictionDTO = new RestrictionDTO();
  isDropdownLoading = false;
  DocumentTypeLabels = DocumentTypeLabels;
  isLoading = false;
  tableHeaders = [
    { name: '', label: '', class:"" },
    { name: 'type', label: 'Type', class:"col-4" },
    { name: 'remarks', label: 'Remarks', class:"col-4" },
    { name: '', label: 'Action', class:"col-4" }
  ]
  constructor(private driverService: DriverService,
    private studentService: StudentService
  ) {
    console.log("SD");
  }
  ngOnInit(): void {
    this.driverService.restrictions().subscribe({
      next: (result) => {
        this.form.restrictions = this.restriction.restrictionsMapper(result);
        console.log(this.restrictions);
      }
    })
  }
  selectStudent(student) {
    this.studentService.show(student.id).subscribe({
      next: (result) => {
        this.form.student = this.student.studentMapper(result);
      }
    })
  }
  searchStudents(student) {
    this.students = [];
    this.isDropdownLoading = true;
    this.driverService.students({
      student: student,
      // exclude: this.form.student?.id
    }).subscribe({
      next: (it) => {
        this.students = this.student.studentsMapper(it);
        console.log(this.students);
        this.isDropdownLoading = false;
      }
    });
  }
  viewDocument(document: DocumentDTO) {
    console.log(document);
  }
  updateDocument(document: DocumentDTO) {
    console.log(document);
  }
  deleteDocument(document: DocumentDTO) {
    console.log(document);
  }
  addDocument() {
    console.log("");
  }
}
