import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormUtils, iFormRules } from "../shared/utils/form.util";

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
export class LoginForm extends FormUtils implements iLogin, iFormRules {
    id: Number;
    email: string;
    password: string;
    form: FormGroup;
    fill (data) {
        this.id = data?.id;
        this.email = data?.email;
        this.password = data?.password;
    }
    valid() {
        let fb: FormBuilder = new FormBuilder();
        this.form = fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
        this.form.patchValue({
            email: this.email ?? '',
            password: this.password ?? ''
        });
        this.formatErrors(this.form);
        return this.form.valid;
    }
}