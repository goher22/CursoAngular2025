import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true)
        }, 2500);
    })
}

export class FormUtils {

    static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
    
    static getTextError(errors: ValidationErrors): string | null {
        for(const key of Object.keys(errors)) {
            switch(key){
                case 'required':
                    return 'Este campo es requerido';

                case 'minlength':
                    return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;

                case 'min':
                    return `Valor mínimo de ${errors['min'].min}`;

                case 'email':
                    return `El valor ingresado no es un correo electrónico`;

                case 'emailTaken':
                    return `El correo electrónico ya esta siendo usado`;

                case 'pattern':
                    if(errors['pattern'].requiredPattern === FormUtils.emailPattern){
                        return `El valor ingresado no parece un correo electrónico`
                    }
                    return `Error de patrón contra expresión regular`;

                default:
                    return `Error no controlado`;
            }
        }
        return null;
    }

    static isFieldOneEqualFieldTwo(field1: string, field2: string) {
        return (formGroup: AbstractControl) => {
        const field1Value = formGroup.get(field1)?.value;
        const field2Value = formGroup.get(field2)?.value;

        return field1Value === field2Value ? null : { passwordsNotEqual: true};
        }
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

    static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {

        await sleep();

        const formValue = control.value

        if(formValue === 'hola@mundo.com'){
            return {
                emailTaken: true
            }
        }

        return null;
    }

}
