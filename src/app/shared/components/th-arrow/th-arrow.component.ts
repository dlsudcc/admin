import { Component, Input } from '@angular/core';

@Component({
  selector: 'th-arrow',
  templateUrl: './th-arrow.component.html',
  styleUrls: ['./th-arrow.component.scss']
})
export class ThArrowComponent {
  @Input() sortDirection : string = '+';
  @Input() name : string;
  @Input() sort : string;
  @Input() description : string;
  ngOnInit(): void {
  }
  get sortColumn() {
    // console.log(this.name)
    return this.sort?.substring(1);
  }
}