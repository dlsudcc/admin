import { Component } from '@angular/core';
import { BookingListingOption } from '../booking/booking-listing-option';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isLoading = false;
  listingOption: BookingListingOption = new BookingListingOption();
  tableHeaders = [
    { name: '', label: '', class:"" },
    { name: 'pickup', label: 'Pick Up', class:"col-4" },
    { name: 'dropOff', label: 'Drop Off', class:"col-4" },
    { name: 'fare', label: 'Fare', class:"col-4" }
  ];
  todayBooking = [];
  view(booking) {

  }
  sortBy (name) {
    if (this.listingOption.sort) {
      this.listingOption.sort = (this.listingOption.sort[0] == '-' ? '+' : '-') + name;
    } else {
      this.listingOption.sort = '+' + name;
    }
    // this.loadContent();
  }
}
