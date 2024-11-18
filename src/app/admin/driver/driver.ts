import { Mapper } from "src/app/shared/utils/mapper";
import { StudentDTO } from "../student/student";
import { DocumentDTO } from "../document/document";
import { FormUtils } from "src/app/shared/utils/form.util";

export interface iDriver {
    id: number;
    student: StudentDTO;
    status: DriverStatus;
    licenseNumber: string;
    documents: DocumentDTO[];
    agencyCode: string;
    restrictions: RestrictionDTO [];
    conditions: ConditionDTO[];
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
    licenseNumber: string;
    documents: DocumentDTO[];
    agencyCode: string;
    restrictions: RestrictionDTO [];
    conditions: ConditionDTO [];
    weight: number;
    height: number;
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
    licenseNumber: string;
    agencyCode: string;
    restrictions: RestrictionDTO [];
    conditions: ConditionDTO [];
    documents: DocumentDTO[];
    weight: number;
    height: number;
    // updateRestrictions(restriction: RestrictionDTO) {
    //     this.res
    // }
    fill(driver: DriverDTO) {
        this.id = driver?.id;
        this.status = driver?.status;
        this.licenseNumber = driver?.licenseNumber;
        this.agencyCode = driver?.agencyCode;
        this.student = driver?.student;
        this.restrictions = driver?.restrictions;
        this.conditions = driver?.conditions;
        this.weight = driver?.weight;
        this.height = driver?.height;
    }
}