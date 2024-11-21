import { FormUtils } from "src/app/shared/utils/form.util";
import { Mapper } from "src/app/shared/utils/mapper";
import { StudentDTO } from "../student/student";
import { DriverDTO } from "../driver/driver";

export interface iDocument {
    id: number;
    type: DocumentType;
    filename: string;
    originalFileName: string;
    remarks: string;
    otherType: string;
    student: StudentDTO;
    location: string;
    driver: DriverDTO;
}
export class DocumentDTO {
    id: number;
    type: DocumentType;
    originalFileName: string;
    filename: string;
    remarks: string;
    otherType: string;
    location: string;
    student: StudentDTO;
    createdAt: Date;
    driver: DriverDTO;

    documentMapper(data) {
        const documentMapper = new Mapper<iDocument, DocumentDTO>((student: DocumentDTO): DocumentDTO => {
            return student;
        })
        return documentMapper.map(data);
    }
    documentsMapper(data) {
        const documentMapper = new Mapper<iDocument[], DocumentDTO[]>((students: DocumentDTO[]): DocumentDTO[] => {
            return students;
        })
        return documentMapper.map(data);
    }
}
export class DocumentForm extends FormUtils implements iDocument {

    id: number;
    type: DocumentType = DocumentType.NONE;
    otherType = '';
    originalFileName: string;
    filename: string;
    file: File;
    location: string;
    remarks: string;
    student: StudentDTO;
    driver: DriverDTO;
    fill (document: DocumentDTO) {
        this.id = document?.id;
        this.type = document?.type;
        this.filename = document?.filename;
        this.otherType = document?.otherType;
        this.remarks = document?.remarks;
        this.originalFileName = document?.originalFileName;
        this.student = document?.student;
        this.driver = document?.driver;
    }
}
export class DocumentFragment {
    id: number;
    type: string;
    name: string;
    filename: string;
    description: string;
}
export enum DocumentType {
    NONE = '',
    ID = 'id',
    BIRTHCERTIFICATE = 'BirCe',
    OTHER = 'other'
}
export const DocumentTypeLabels: { [key in DocumentType]: string } = {
    [DocumentType.NONE]: '',
    [DocumentType.ID]: 'Identification Card',
    [DocumentType.BIRTHCERTIFICATE]: 'Birth Certificate',
    [DocumentType.OTHER]: 'Other'
};
