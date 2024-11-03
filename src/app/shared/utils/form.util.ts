import { FormGroup } from "@angular/forms";

export class FormUtils {
    errors: any = [];
    getError(fieldName) {
        return this.errors.find(it=>it.field == fieldName)?.error
    }
    private formatControlName(controlName: string): string {
        return controlName.charAt(0).toUpperCase() + controlName.slice(1).replace(/([A-Z])/g, ' $1');
    }
    addError (controlName, error) {
        this.errors.push ({field: controlName, error: error});
    }
    formatErrors(form: FormGroup) {
        this.errors = [];
        Object.keys(form.controls).forEach(controlName => {
            const control = form.get(controlName);
            if (control?.invalid) {
                for (const [key, value] of Object.entries(control.errors)) {
                    let error = '';
                    switch (key) {
                        case 'required':
                            error = this.formatControlName(controlName)+ ' is required';
                        break;
                        case 'email':
                            error = this.formatControlName(controlName)+ ' must be an email';
                        break;
                        case 'minLength':
                            error = this.formatControlName(controlName) + ' must be equal or greater than ' + value?.requiredLength;    
                    }
                    
                    if (!this.errors.find(it=>it.field == controlName)) {
                        this.errors.push({field: controlName, error: error})
                    }
                }
            }
            return true;
        });
    }
}
export class FormItemUtils {
    errors: any = {};
}
export interface iFormRules {
    valid();
}