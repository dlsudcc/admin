import { Component, Input, OnInit } from '@angular/core';
import { DriverStatusLabels, DriverStatusLabelsClass } from 'src/app/admin/driver/driver';
import { StudentStatus, StudentStatusLabels, StudentStatusLabelsClass } from 'src/app/admin/student/student';
import { CommonStatus, CommonStatusLabels, CommonStatusLabelsClass } from '../../models/status';

@Component({
  selector: 'app-status-labels',
  templateUrl: './status-labels.component.html',
  styleUrls: ['./status-labels.component.scss']
})
export class StatusLabelsComponent implements OnInit {
  @Input() entity: string;
  @Input() status;
  entities = {
    StudentStatus:{statusLabels: StudentStatusLabels, statusLabelClass: StudentStatusLabelsClass},
    DriverStatus:{statusLabels: DriverStatusLabels, statusLabelClass: DriverStatusLabelsClass},
    DepartmentStatus:{statusLabels: CommonStatusLabels, statusLabelClass: CommonStatusLabelsClass},
  };
  ngOnInit() {
    if (!this.entities[this.entity]) {
      console.error("Entity not found!");
    }
  }
  get statusLabel() {
    return this.entities[this.entity]['statusLabels'][this.status];
  }
  get statusLabelClass() {
    return this.entities[this.entity]['statusLabelClass'][this.status];
  }
}
