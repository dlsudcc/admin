import { Mapper } from "src/app/shared/utils/mapper";
import { StudentDTO } from "../student/student";
import { DocumentDTO } from "../document/document";
import { FormUtils } from "src/app/shared/utils/form.util";
import { VehicleDTO } from "../vehicle/vehicle";

export interface iDriver {
    id: number;
    student: StudentDTO;
    status: DriverStatus;
    licenseNumber: string;
    vehicles: VehicleDTO[];
    documents: DocumentDTO[];
    agencyCode: string;
    canUpdate: boolean;
    canVerify: boolean;
    canDisable: boolean;
    licenseExpirationDate: Date;
    restrictions: RestrictionDTO [];
    // conditions: ConditionDTO[];
    weight: number;
    height: number;
}
export interface iRestriction {
    id: string;
    description: string;
}
export class RestrictionDTO implements iRestriction {
    id: string;
    description: string;
    isSelected = false;

    restrictionMapper(data) {
        const restrictionMapper = new Mapper<iRestriction, RestrictionDTO>((restriction: RestrictionDTO): RestrictionDTO => {
            return restriction;
        })
        return restrictionMapper.map(data);
    }
    restrictionsMapper(data) {
        const restrictionMapper = new Mapper<iRestriction[], RestrictionDTO[]>((restrictions: RestrictionDTO[]): RestrictionDTO[] => {
            return restrictions;
        })
        return restrictionMapper.map(data);
    }
}
export class ConditionDTO {
    id: string;
    description: string;
}
export enum DriverStatus {
    ALL = '',
    INACTIVE = 'inact',
    FORVERIFICATION = 'forVe',
    VERIFIED = 'verif'
}

export const DriverStatusLabels: { [key in DriverStatus]: string } = {
    [DriverStatus.ALL]: '',
    [DriverStatus.INACTIVE]: 'Inactive',
    [DriverStatus.FORVERIFICATION]: 'For Verification',
    [DriverStatus.VERIFIED]: 'Verified'
};
export const DriverStatusLabelsClass = {
    [DriverStatus.INACTIVE]: 'badge badge-secondary font-sm',
    [DriverStatus.FORVERIFICATION]: 'badge badge-info font-sm',
    [DriverStatus.VERIFIED]: 'badge badge-success font-sm'
};
export class DriverDTO implements iDriver {
    id: number;
    student: StudentDTO;
    status: DriverStatus;
    canVerify: boolean;
    canDisable: boolean;
    licenseNumber: string;
    licenseExpirationDate: Date;
    documents: DocumentDTO[];
    vehicles: VehicleDTO[];
    agencyCode: string;
    restrictions: RestrictionDTO [];
    // conditions: ConditionDTO [];
    weight: number;
    height: number;
    canUpdate: boolean;
    driverMapper(data) {
        const driverMapper = new Mapper<iDriver, DriverDTO>((driver: DriverDTO): DriverDTO => {
            return driver;
        })
        return driverMapper.map(data);
    }
    driversMapper(data) {
        const driverMapper = new Mapper<iDriver[], DriverDTO[]>((drivers: DriverDTO[]): DriverDTO[] => {
            return drivers;
        })
        return driverMapper.map(data);
    }
}
export class DriverForm extends FormUtils implements iDriver {
    id: number;
    student: StudentDTO;
    status: DriverStatus;
    canVerify: boolean;
    canUpdate: boolean;
    canDisable: boolean;
    licenseNumber: string;
    licenseExpirationDate: Date;
    agencyCode: string;
    restrictions: RestrictionDTO [] = [];
    vehicles: VehicleDTO [] = [];
    documents: DocumentDTO[] = [];
    weight: number;
    height: number;
    // updateRestrictions(restriction: RestrictionDTO) {
    //     this.res
    // }
    get selectedRestrictions() {
      return this.restrictions.filter(it => it.isSelected);
    }
    fill(driver: DriverDTO) {
        this.id = driver?.id;
        this.status = driver?.status;
        this.licenseNumber = driver?.licenseNumber;
        this.agencyCode = driver?.agencyCode;
        this.student = driver?.student;
        this.documents = driver?.documents;
        this.vehicles = driver?.vehicles;
        this.licenseExpirationDate = driver?.licenseExpirationDate;
        this.weight = driver?.weight;
        this.height = driver?.height;
    }
    fillRestrictions(restrictions, driverRestrictions) {
      restrictions?.forEach((restriction) => {
        const matchingRestriction = driverRestrictions.find(item => item.id === restriction.id);
        let restrict = new RestrictionDTO()
        restrict.id = restriction.id;
        restrict.description = restriction.description;
        restrict.isSelected = matchingRestriction;
        this.restrictions.push(restrict);
      });
    }
    updateDocument (document: DocumentDTO) {
      let index = this.documents.findIndex(it => it.id === document.id);
      if (index !== -1) {
        this.documents.splice(index, 1, document); // Replace the object at the index
      }
    }
    updateVehicle (vehicle: VehicleDTO) {
      let index = this.vehicles.findIndex(it => it.id === vehicle.id);
      if (index !== -1) {
        this.vehicles.splice(index, 1, vehicle); // Replace the object at the index
      }
    }
    toSubmit() {
      return {
        id: this.id,
        restrictions: this.selectedRestrictions.map(it => it.id),
        documents: this.documents.map(it=>it.id),
        height: this.height,
        weight: this.weight,
        licenseExpirationDate: this.licenseExpirationDate,
        student: this.student?.id,
        vehicles: this.vehicles.map(it=>it.id),
        agencyCode: this.agencyCode,
        licenseNumber: this.licenseNumber
      }
    }
}
