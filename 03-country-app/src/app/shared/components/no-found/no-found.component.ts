import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'no-found',
  imports: [],
  templateUrl: './no-found.component.html',
})
export class NoFoundComponent {
  location = inject(Location)

  goBack() {
    this.location.back();
  }
}
