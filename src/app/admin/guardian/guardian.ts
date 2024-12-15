import { FormUtils } from "src/app/shared/utils/form.util";
import { Mapper } from "src/app/shared/utils/mapper";
import { StudentDTO } from "../student/student";

export interface iGuardian {
  id: number;
  relationship: string;
  lastName: string;
  otherType: string;
  firstName: string;
  middleName: string;
  contactNumber: string;
  status: string;
}
export class GuardianDTO implements iGuardian {
  id: number;
  relationship: string;
  otherType: string;
  lastName: string;
  firstName: string;
  middleName: string;
  contactNumber: string;
  status: string;
  guardianMapper(data) {
      const guardianMapper = new Mapper<iGuardian, GuardianDTO>((guardian: GuardianDTO): GuardianDTO => {
          return guardian;
      })
      return guardianMapper.map(data);
  }
  guardiansMapper(data) {
      const guardianMapper = new Mapper<iGuardian[], GuardianDTO[]>((guardians: GuardianDTO[]): GuardianDTO[] => {
          return guardians;
      })
      return guardianMapper.map(data);
  }
}
export class GuardianForm extends FormUtils implements iGuardian {
  id: number;
  relationship: string = "";
  otherType: string;
  lastName: string;
  firstName: string;
  middleName: string;
  contactNumber: string;
  student: StudentDTO;
  status: string;
  fill(guardian: GuardianDTO) {
    this.id = guardian?.id;
    this.relationship = guardian?.relationship;
    this.otherType = guardian?.otherType;
    this.lastName = guardian?.lastName;
    this.firstName = guardian?.firstName;
    this.middleName = guardian?.middleName;
    this.contactNumber = guardian?.contactNumber;
  }
  toSubmit() {
    return {
      relationship: this.relationship,
      otherType: this.otherType,
      lastName: this.lastName,
      firstName: this.firstName,
      middleName: this.middleName,
      contactNumber: "0"+this.contactNumber,
      student: this.student.id
    }
  }
}
export enum RelationshipType {
  NONE = '',
  FATHER = 'fathe',
  MOTHER = 'mothe',
  SIBLING = 'sibli',
  OTHER = 'other'
}
export const RelationshipTypeLabels: { [key in RelationshipType]: string } = {
    [RelationshipType.NONE]: '',
    [RelationshipType.FATHER]: 'Father',
    [RelationshipType.MOTHER]: 'Mother',
    [RelationshipType.SIBLING]: 'Sibling',
    [RelationshipType.OTHER]: 'Other'
};
