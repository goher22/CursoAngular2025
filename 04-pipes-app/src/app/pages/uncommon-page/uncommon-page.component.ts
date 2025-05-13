import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { I18nSelectPipe } from '@angular/common';

const client1 = {
  name: 'Client 1',
  gender: 'male',
  age: 39,
  address: 'Ottawa, Canadá'
}

const client2 = {
  name: 'Client 2',
  gender: 'female',
  age: 33,
  address: 'Toronto, Canadá'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {
  //i118n Select
  client = signal(client1);
  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }

  changeClient() {
    if(this.client() === client1) {
      this.client.set(client2);
      return;
    }

    this.client.set(client1);
  }

}
