import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html'
})
export class SwitchesPageComponent {
  private fb = inject(FormBuilder);
  formUtil = FormUtils;

  myForm:  FormGroup = this.fb.group({
      gender: ['M', Validators.required],
      wantNotification: [true],
      termAndCondition: [false, Validators.requiredTrue],
    }
  );

  onSubmit(){
    this.myForm.markAllAsTouched();
  }
}
