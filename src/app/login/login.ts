import { FormGroup } from "@angular/forms";
import { FormUtils, iFormRules } from "../shared/utils/form.util";

export interface iLogin {
    id: number;
    email: string;
    password: string;
} 
export class LoginDTO implements iLogin {
    id: number;
    email: string;
    password: string;
}
export class LoginForm extends FormUtils implements iLogin, iFormRules {
    id: number;
    email: string;
    password: string;
    form: FormGroup;
    fill (data) {
        this.id = data?.id;
        this.email = data?.email;
        this.password = data?.password;
    }
    valid(){
        return true;
    }
}