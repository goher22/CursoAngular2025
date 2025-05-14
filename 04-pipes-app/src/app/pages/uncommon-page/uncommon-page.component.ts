import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';

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
  imports: [  
    CardComponent,
    I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, UpperCasePipe, KeyValuePipe, TitleCasePipe, AsyncPipe],
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

  //i118n Plural
  clientsMap = signal({
    '=0': 'no tenemos ningun cliente esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos 2 clientes esperando',
    'other': 'tenemos # clientes esperando'
  })

  clients = signal([
    'Maria',
    'Pedro',
    'Juan',
    'Luis',
    'Ana',
    'Jorge',
    'Carlos',
    'Lucia',
    'Sofia',
    'Valentina',
    'Mateo',
    'Diego',
    'Emilia',
    'Victoria',
    'Camila',
    'Isabella',
    'Gabriel',
    'Samuel',
    'Matias',
    'Leonardo',
  ]);


  deleteClient() {
    this.clients.update((clients) => clients.slice(1));
  }

  //KeyValue Pipe
  profile = signal({
    name: 'Fernando',
    age: 35,
    address: 'Ottawa, Canadá'
  });

  // Async Pipe
  promiseValue = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Tenemos datos en la promesa');
      }, 3500);
    }
  );

}
