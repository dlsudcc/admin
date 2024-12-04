import { FormUtils } from "src/app/shared/utils/form.util";
import { DepartmentDTO } from "../department/department";
import { CommonStatus } from "src/app/shared/models/status";
import { Mapper } from "src/app/shared/utils/mapper";

export interface iSection {
    id: number;
    name: string;
    department: DepartmentDTO;
    status: CommonStatus;
}
export class SectionDTO implements iSection {
    id: number;
    name: string;
    department: DepartmentDTO;
    status: CommonStatus;
    sectionMapper(data) {
        const sectionMapper = new Mapper<iSection, SectionDTO>((section: SectionDTO): SectionDTO => {
            return section;
        })
        return sectionMapper.map(data);
    }
    sectionsMapper(data) {
        const sectionsMapper = new Mapper<iSection[], SectionDTO[]>((sections: SectionDTO[]): SectionDTO[] => {
            return sections;
        })
        return sectionsMapper.map(data);
    }
}
export class SectionForm extends FormUtils implements iSection {
    id: number;
    department: DepartmentDTO;
    name: string;
    status: CommonStatus;
    fill (section: SectionDTO) {
      this.id = section?.id;
      this.name = section?.name;
      this.department = section?.department;
      this.status = section?.status;
    }
    toSubmit() {
      return {
        name: this.name,
        id: this.id,
        department: this.department?.id
      }
    }
}
export class SectionFragment {
    id: number;
    name: string;
}
