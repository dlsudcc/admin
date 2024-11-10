import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() result;
  @Input() currentPage : Number;
  @Input() totalPages : Number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  get availablePages(): number[] {
    const maxPagesToShow = 5;
    const totalPagesToShow = Math.min(this.totalPages.valueOf(), maxPagesToShow);
    const firstPage = Math.max(1, this.currentPage.valueOf() - Math.floor(maxPagesToShow / 2));
    const lastPage = Math.min(this.totalPages.valueOf(), firstPage + maxPagesToShow - 1);
    return Array.from({ length: totalPagesToShow }, (_, i) => firstPage + i);
  }

  changePage(page: number): void {
      if (page >= 1 && page <= this.totalPages.valueOf()) {
        this.currentPage = page;
        this.pageChanged.emit(page);
      }
  }
}
