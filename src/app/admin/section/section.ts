export interface iSection {
    id: number;
    code: string;
    name: string;
    description: string;
}
export class SectionDTO implements iSection {
    id: number;
    code: string;
    name: string;
    description: string;
}
export class SectionFragment {
    id: number;
    name: string;
}