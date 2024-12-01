import { CommonStatus } from "src/app/shared/models/status";
import { DocumentDTO } from "../document/document";
import { FormUtils } from "src/app/shared/utils/form.util";
import { Mapper } from "src/app/shared/utils/mapper";

export interface iVehicle {
  id: number;
  status: CommonStatus;
  plateNumber: string;
  engineNumber: string;
  color: string;
  chassisNumber: string;
  netDisplacement: number;
  netCapacity: number;
  orDoc: DocumentDTO;
  crDoc: DocumentDTO;
  make: MakeDTO;
  orDate: Date;
  orDocument: File;
  crDocument: File;
  isNew: boolean;
  isDeleted: boolean;
  crDate: Date;
  series: string;
  bodyType: BodyTypeDTO;
}
export class VehicleDTO implements iVehicle {
  id: number;
  status: CommonStatus;
  plateNumber: string;
  engineNumber: string;
  color: string;
  chassisNumber: string;
  netDisplacement: number;
  netCapacity: number;
  make: MakeDTO;
  orDate: Date;
  orNumber: string;
  crNumber: string;
  orDocument: File;
  isNew: boolean;
  isDeleted: boolean;
  crDocument: File;
  orDoc: DocumentDTO;
  crDoc: DocumentDTO;
  crDate: Date;
  series: string;
  bodyType: BodyTypeDTO;
}
export class VehicleForm extends FormUtils implements iVehicle {
  id: number;
  status: CommonStatus;
  plateNumber: string;
  engineNumber: string;
  color: string;
  chassisNumber: string;
  netDisplacement: number = 0;
  netCapacity: number = 0;
  make: MakeDTO;
  orDate: Date;
  orDoc: DocumentDTO;
  crDoc: DocumentDTO;
  orNumber: string;
  crNumber: string;
  orDocument: File;
  crDocument: File;
  crDate: Date;
  series: string;
  bodyType: BodyTypeDTO;
  isUpdateDriver = false;
  isNew = false;
  isDeleted = false;
  fill(vehicle: VehicleDTO) {
    this.id = vehicle?.id;
    this.status = vehicle?.status;
    this.plateNumber = vehicle?.plateNumber;
    this.color = vehicle?.color;
    this.chassisNumber = vehicle?.chassisNumber;
    this.engineNumber = vehicle?.engineNumber;
    this.netDisplacement = vehicle?.netDisplacement;
    this.netCapacity = vehicle?.netCapacity;
    this.make = vehicle?.make;
    this.isNew = false;
    this.orDate = vehicle?.orDate;
    this.orDoc = vehicle?.orDoc;
    this.crDoc = vehicle?.crDoc;
    this.orNumber = vehicle?.orNumber;
    this.crNumber = vehicle?.crNumber;
    this.crDate = vehicle?.crDate;
    this.series = vehicle?.series;
    this.bodyType = vehicle?.bodyType;
  }
  toSubmit() {
    return {
      id: this.id,
      make: this.make.id,
      plateNumber: this.plateNumber,
      color: this.color,
      chassisNumber: this.chassisNumber,
      engineNumber: this.engineNumber,
      netDisplacement: this.netDisplacement,
      netCapacity: this.netCapacity,
      orDate: this.orDate,
      crDate: this.crDate,
      orNumber: this.orNumber,
      crNumber: this.crNumber,
      series: this.series,
      bodyType: this.bodyType.id,
      isUpdateDriver: this.isUpdateDriver,
      isNew: this.isNew
    }
  }
}
export interface iMake {
  id: number;
  name: string;
}
export class MakeDTO implements iMake {
  id: number;
  name: string;
  makeMapper(data) {
      const makeMapper = new Mapper<iMake, MakeDTO>((makes: MakeDTO): MakeDTO => {
          return makes;
      })
      return makeMapper.map(data);
  }
  makesMapper(data) {
      const makeMapper = new Mapper<iMake[], MakeDTO[]>((makes: MakeDTO[]): MakeDTO[] => {
          return makes;
      })
      return makeMapper.map(data);
  }
}
export interface iBodyType {
  id: number;
  name: string;
}
export class BodyTypeDTO implements iBodyType {
  id: number;
  name: string;
  bodyTypeMapper(data) {
      const bodyTypeMapper = new Mapper<iBodyType, BodyTypeDTO>((bodyType: BodyTypeDTO): BodyTypeDTO => {
          return bodyType;
      })
      return bodyTypeMapper.map(data);
  }
  bodyTypesMapper(data) {
      const makeMapper = new Mapper<iBodyType[], BodyTypeDTO[]>((bodyTypes: BodyTypeDTO[]): BodyTypeDTO[] => {
          return bodyTypes;
      })
      return makeMapper.map(data);
  }
}
