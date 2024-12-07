import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-export-control',
  templateUrl: './export-control.component.html',
  styleUrls: ['./export-control.component.scss']
})
export class ExportControlComponent {
  @Input() hasPdf = false;
  @Input() hasExcel = false;
  @Input() hasExcelDetailed = false;
  @Output() result = new EventEmitter<string>();
  export(option) {
    this.result.emit(option);
  }
}
