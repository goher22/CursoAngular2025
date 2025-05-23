import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {

    static getTextError(errors: ValidationErrors): string | null {
        for(const key of Object.keys(errors)) {
            switch(key){
                case 'required':
                return 'Este campo es requerido';

                case 'minlength':
                return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;

                case 'min':
                return `Valor mínimo de ${errors['min'].min}`;
            }
        }
        return null;
    }

    static isValidField(form: FormGroup, fieldName: string): boolean | null {
        return !!form.controls[fieldName].errors && form.controls[fieldName].touched;
    }

    static getFieldError(form:FormGroup, fieldName: string): string | null{
        const control = form.get(fieldName);

        if(!control) return null;

        const errors = control.errors ?? {};

        return this.getTextError(errors);
    }

    static isValidFieldInArray(formArray:FormArray, index: number){
        return (
            formArray.controls[index].errors && formArray.controls[index].touched
        );
    }

    static getFieldErrorIArray(formArray:FormArray, index: number): string | null{

        if(formArray.controls.length === 0) return null;

        const errors = formArray.controls[index].errors ?? {};

        return this.getTextError(errors);
    }

}
