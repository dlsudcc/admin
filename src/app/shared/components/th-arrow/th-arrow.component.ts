import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-th-arrow',
  templateUrl: './th-arrow.component.html',
  styleUrls: ['./th-arrow.component.scss']
})
export class ThArrowComponent {
  @Input() sortDirection = '+';
  @Input() name : string;
  @Input() sort : string;
  @Input() description : string;
  
  get sortColumn() {
    // console.log(this.name)
    return this.sort?.substring(1);
  }
}