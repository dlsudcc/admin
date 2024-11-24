import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit, OnChanges {
  @Input() data: object[] = [];
  @Input() formModel; // This is the bound value
  @Input() label = '';
  @Input() field = '';
  @Input() noField = false;
  @Input() isLoading = false;
  isActive = false;
  @Input() error;
  @Input() updateModel;
  @Input() clearAfterSelect = false;
  @Input() disabled = false;
  @Input() labelClass = '';
  private selectedItem: object | null = null; // Keep track of the selected item
  @Output() formModelChange = new EventEmitter<object>(); // Emit the selected value to the parent
  @Output() userSearchedText = new EventEmitter<string>(); // Emit the selected value to the parent
  @Output() selectionChanged = new EventEmitter<string>(); // Emit the selected value to the parent

  searchText = '';
  filteredData: object[] = [];

  private searchTextChanged = new Subject<string>(); // Subject to handle search text changes

  ngOnInit(): void {
    console.log(this.updateModel);
    if (this.updateModel) {
      this.searchText = this.updateModel[this.field];
    }
    this.searchTextChanged
      .pipe(debounceTime(300)) // 300 ms delay
      .subscribe(() => {
        this.onSearchChange(); // Trigger search after delay
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.disabled) {
      this.searchText = null;
    }
    if (changes['data']) {
      this.filteredData = [];
      if (this.data) {
        this.data.filter((item) => {
          const isExisting = this.filteredData?.find(it=> it[this.field] == item[this.field]);
          if (!isExisting) {
            this.filteredData = [...this.filteredData, item];
          }
        });
      }
    } else {
      this.filteredData = [];
    }
  }
  onFocus() {
    this.isActive = true;
    this.userSearchedText.emit(this.searchText);
  }
  onBlur() {
    this.isActive = false;
  }
  onSearchTextChanged(): void {
    this.searchTextChanged.next(this.searchText);
    // Check if the searchText has been modified from the selected item's value
    if (this.selectedItem && this.searchText !== this.selectedItem[this.field]) {
      this.selectedItem = null; // Reset the selected item
      this.formModel = null; // Reset the form model
      this.formModelChange.emit(null); // Notify parent about the reset
    }
  }
  // onSearchTextChanged(): void {
  //   this.searchTextChanged.next(this.searchText);
  // }

  onSearchChange(): void {
    if (this.searchText.trim().length > 0) {
      this.userSearchedText.emit(this.searchText);
    } else{
      this.userSearchedText.emit(null);
      // this.selectionChanged.emit(null);
    }
  }

  onSelect(item: object): void {
    console.log(item);
    this.formModel = item;
    this.formModelChange.emit(item);
    // this.selectionChanged.emit(item);
    this.filteredData = [];
    this.searchText = item[this.field];
    this.searchText = this.clearAfterSelect ? null: this.searchText;
  }
}
