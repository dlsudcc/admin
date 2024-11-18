import { FormUtils, iFormRules } from "src/app/shared/utils/form.util";
import { DepartmentFragment } from "../department/department";
import { SectionFragment } from "../section/section";
import { AddressFragment } from "../address/address";
import { AuthFragment } from "src/app/shared/models/auth";
import { Mapper } from "src/app/shared/utils/mapper";
import { DocumentDTO } from "../document/document";
export enum BloodType {
    A = 'A',
    B = 'B',
    AB = 'AB',
    O = 'O'
}

export enum StudentStatus {
    ALL = '',
    INACTIVE = 'inact',
    FORVERIFICATION = 'forVe',
    VERIFIED = 'verif'
}
export const StudentStatusLabels: { [key in StudentStatus]: string } = {
    [StudentStatus.ALL]: '',
    [StudentStatus.INACTIVE]: 'Inactive',
    [StudentStatus.FORVERIFICATION]: 'For Verification',
    [StudentStatus.VERIFIED]: 'Verified'
};
export const StudentStatusLabelsClass = {
    [StudentStatus.INACTIVE]: 'badge badge-secondary font-sm',
    [StudentStatus.FORVERIFICATION]: 'badge badge-info font-sm',
    [StudentStatus.VERIFIED]: 'badge badge-success font-sm'
};
export interface iStudent {
    id: number;
    lastName: string;
    firstName: string;
    middleName: string;
    nationality: string;
    name: string;
    sex: string;
    profilePicture: string;
    birthDate: Date;
    bloodType: BloodType;
    department: DepartmentFragment;
    section: SectionFragment;
    year: number;
    documents: DocumentDTO[];
    homeAddress: AddressFragment;
    permanentAddress: AddressFragment;
    isPermanentAddressSame: boolean;
    status: StudentStatus;
    authentication: AuthFragment;
    canVerify: boolean;
    createdAt: Date;
    isEnrolledAsDriver: boolean;
}
export class StudentDTO implements iStudent {
    id: number;
    lastName: string;
    firstName: string;
    nationality: string;
    sex: string;
    middleName: string;
    profilePicture: string;
    documents: DocumentDTO[] = [];
    birthDate: Date;
    canVerify: boolean;
    bloodType: BloodType;
    department: DepartmentFragment;
    section: SectionFragment;
    year: number;
    homeAddress: AddressFragment;
    permanentAddress: AddressFragment;
    isPermanentAddressSame: boolean;
    status: StudentStatus;
    authentication: AuthFragment;
    createdAt: Date;
    isEnrolledAsDriver: boolean;
    name: string;
    studentMapper(data) {
        const studentMapper = new Mapper<iStudent, StudentDTO>((students: StudentDTO): StudentDTO => {
            return students;
        })
        return studentMapper.map(data);
    }
    studentsMapper(data) {
        const studentMapper = new Mapper<iStudent[], StudentDTO[]>((students: StudentDTO[]): StudentDTO[] => {
            return students;
        })
        return studentMapper.map(data);
    }
}
export class StudentForm extends FormUtils implements iStudent, iFormRules {
    id: number;
    lastName: string;
    firstName: string;
    middleName: string;
    profilePicture: string;
    canVerify: boolean;
    birthDate: Date;
    bloodType: BloodType;
    nationality: string;
    sex: string;
    department: DepartmentFragment;
    section: SectionFragment;
    documents: DocumentDTO[] = [];
    year: number;
    homeAddress: AddressFragment;
    permanentAddress: AddressFragment;
    isPermanentAddressSame: boolean;
    status: StudentStatus;
    authentication: AuthFragment;
    createdAt: Date;
    isEnrolledAsDriver: boolean;
    get name () {
       return this.lastName + " " + this.firstName + " " + this.middleName;
    }
    fill (student: StudentDTO) {
        this.id = student?.id;
        this.lastName = student?.lastName;
        this.firstName = student?.firstName;
        this.middleName = student?.middleName;
        this.profilePicture = student?.profilePicture;
        this.birthDate = student?.birthDate;
        this.bloodType = student?.bloodType;
        this.department = student?.department;
        this.section = student?.section;
        this.year = student?.year;
        this.homeAddress = student?.homeAddress;
        this.permanentAddress = student?.permanentAddress;
        this.isPermanentAddressSame = student?.isPermanentAddressSame;
        this.nationality = student?.nationality;
        this.sex = student?.sex;
        this.status = student?.status;
        this.authentication = student?.authentication;
        this.createdAt = student?.createdAt;
        this.isEnrolledAsDriver = student?.isEnrolledAsDriver;
    }
}