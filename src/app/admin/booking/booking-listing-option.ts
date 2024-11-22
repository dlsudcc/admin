export class BookingListingOption {
  search: string;
  sort: string;
  page: string;
  // status: StudentStatus = StudentStatus.ALL;
  // departments: DepartmentDTO[] = [];
  // years = [];
  // bloodType: BloodType;
  // section: SectionFragment;
  // barangays= [];
  // city: string;
  // province: string;
  // region: string;
  // isEnrolledAsDriver: boolean;
  get sortDirection () {
      return this.sort && this.sort[0] == '-' ? '-' : '+';
  }
}
