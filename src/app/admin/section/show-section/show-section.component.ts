import { Component, OnInit } from '@angular/core';
import { SectionDTO, SectionForm } from '../section';
import { SectionService } from '../section.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CommonStatus } from 'src/app/shared/models/status';

@Component({
  selector: 'app-show-section',
  templateUrl: './show-section.component.html',
  styleUrls: ['./show-section.component.scss']
})
export class ShowSectionComponent implements OnInit {
  section: SectionDTO = new SectionDTO();
  form: SectionForm = new SectionForm();
  isLoading = false;
  CommonStatus = CommonStatus;
  isDropdownLoading = false;
  isUpdate = false;
  constructor(
    private sectionService: SectionService,
    private modal: NgbActiveModal,
    private toastService: ToastService
  ) {
  }
  ngOnInit() {
    this.loadContent();
  }
  loadContent() {
    this.sectionService.show(this.section.id).subscribe({
      next: (result) => {
        let section = new SectionDTO();
        this.section = section.sectionMapper(result);
      }
    })
  }
  close() {
    this.modal.close(false);
  }
  update(){
    this.isUpdate = true;
    this.form.fill(this.section);
  }
  updateResult(result) {
    if (!result) {
      this.isUpdate = false;
    } else {
      this.loadContent();
      this.isUpdate = false;
    }
  }
  cancel(){
    this.isUpdate = false;
  }
  save(){
    this.isUpdate = false;
  }
}
