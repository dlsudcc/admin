import { FormUtils } from "../shared/utils/form.util";

export interface iLogin {
    id: Number;
    email: string;
    password: string;
} 
export class LoginDTO implements iLogin {
    id: Number;
    email: string;
    password: string;
}
export class LoginForm extends FormUtils implements iLogin {
    id: Number;
    email: string;
    password: string;
    fill (data) {
        this.id = data?.id;
        this.email = data?.email;
        this.password = data?.password;
    }
    
}