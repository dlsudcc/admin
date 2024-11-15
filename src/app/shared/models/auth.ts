import { CommonStatus } from "./status";

export interface iAuth {
    id: number;
    username: string;
    password: string;
    email: string;
    status: CommonStatus
}

export class AuthFragment {
    id: number;
    username: string;
    password: string;
    email: string;
    status: CommonStatus
}