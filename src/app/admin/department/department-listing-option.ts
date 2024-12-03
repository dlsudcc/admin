export class DepartmentListingOption {
  search: string;
  sort: string;
  page: string;
  status: string;
  get sortDirection () {
      return this.sort && this.sort[0] == '-' ? '-' : '+';
  }
}
export enum DepartmentListingOptionStatus {
  STATUS_ACTIVE = 'activ',
  STATUS_INACTIVE = 'inact'
}
