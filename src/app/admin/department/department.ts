import { CommonStatus } from "src/app/shared/models/status";
import { FormUtils } from "src/app/shared/utils/form.util";
import { Mapper } from "src/app/shared/utils/mapper";

export interface iDepartment {
    id: number;
    code: string;
    name: string;
    description: string;
}
export class DepartmentDTO implements iDepartment {
    id: number;
    code: string;
    name: string;
    status: CommonStatus;
    description: string;
    departmentMapper(data) {
        const studentMapper = new Mapper<iDepartment, DepartmentDTO>((department: DepartmentDTO): DepartmentDTO => {
            return department;
        })
        return studentMapper.map(data);
    }
    departmentsMapper(data) {
        const studentMapper = new Mapper<iDepartment[], DepartmentDTO[]>((students: DepartmentDTO[]): DepartmentDTO[] => {
            return students;
        })
        return studentMapper.map(data);
    }
}
export class DepartmentFragment {
    id: number;
    code: string;
    name: string;
    description: string;

}
export class DepartmentForm extends FormUtils implements iDepartment {
    id: number;
    code: string;
    name: string;
    description: string;
    fill (department: DepartmentDTO) {
      this.id = department.id;
      this.code = department.code;
      this.name = department.name;
      this.description = department.description;
    }
}
