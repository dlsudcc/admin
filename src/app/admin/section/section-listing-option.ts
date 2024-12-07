import { DepartmentDTO } from "../department/department";

export class SectionListingOption {
  search: string;
  sort: string;
  page: string;
  export: string;
  status: string;
  departments: DepartmentDTO[] = [];
  get sortDirection () {
      return this.sort && this.sort[0] == '-' ? '-' : '+';
  }
}
export enum SectionListingOptionStatus {
  STATUS_ACTIVE = 'activ',
  STATUS_INACTIVE = 'inact'
}
