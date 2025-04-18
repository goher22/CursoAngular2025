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

  name = signal<string>('Gohan');
  power = signal<number>(100);


  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9000 },
    { id: 2, name: 'Vegeta', power: 8500 },
    { id: 3, name: 'Gohan', power: 8000 },
    { id: 4, name: 'Piccolo', power: 7000 },
    { id: 5, name: 'Krillin', power: 6000 },
    { id: 6, name: 'Bulma', power: 500 }
  ]);


  addCharacter() {
    if(!this.name() || !this.power() || this.power() <= 0) return;

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power()
    }
    this.characters.update((prev) => [...prev, newCharacter]);
    this.resetForm();
  }

  resetForm() {
    this.name.set('');
    this.power.set(0);
  }
}
