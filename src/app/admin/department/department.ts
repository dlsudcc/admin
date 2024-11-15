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