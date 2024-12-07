import { DepartmentDTO } from "../department/department";
import { SectionFragment } from "../section/section";
import { BloodType } from "../student/student";
import { DriverStatus } from "./driver";

export class DriverListingOption {
    search: string;
    name: string;
    email: string;
    sort: string;
    page: string;
    export: string;
    status: DriverStatus = DriverStatus.ALL;
    departments: DepartmentDTO[] = [];
    years = [];
    bloodType: BloodType;
    section: SectionFragment;
    barangays= [];
    city: string;
    province: string;
    region: string;
    get sortDirection () {
        return this.sort && this.sort[0] == '-' ? '-' : '+';
    }
}
