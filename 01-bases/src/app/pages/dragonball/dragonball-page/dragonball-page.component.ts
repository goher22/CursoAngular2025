import { Component, computed, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power:number
}

@Component({
  selector: 'app-dragonball-page',
  imports: [],
  templateUrl: './dragonball-page.component.html'
})
export class DragonballPageComponent {
  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9000 },
    { id: 2, name: 'Vegeta', power: 8500 },
    { id: 3, name: 'Gohan', power: 8000 },
    { id: 4, name: 'Piccolo', power: 7000 },
    { id: 5, name: 'Krillin', power: 6000 },
    { id: 6, name: 'Bulma', power: 500 }
  ]);
}
