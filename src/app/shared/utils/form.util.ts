import { FormGroup } from "@angular/forms";
export class Error {
    field: string;
    error: string;
}
export class FormUtils {
    errors: Error[] = [];
    getError(fieldName) {
        return this.errors[fieldName];
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
    get otherErrors() {
        const errors = [];
        for (const [key, value] of Object.entries(this.errors)) {
            if (key.includes('otherError')) {
                errors.push(value);
            }
        }
        return errors;
    }
    handleFormError(data, dtoErrors) {
        console.log(data);
        if (data.error.errors) {
            dtoErrors = {};
            for (const field in data.error.errors) {
                if (data.status == 400 && data.error.errors[field]) {
                    dtoErrors[field] = data.error.errors[field];
                } else {
                    dtoErrors['otherError' + field] = data.error.errors[field];
                }
            }
            return dtoErrors;
        }
        console.log(this.errors);
        return {};
    }
}
export class FormItemUtils {
    errors = {};
}
export interface iFormRules {
    fill (object);
}