import { Component, signal } from '@angular/core';
import { CharacterListComponent } from '../../components/dragonball/character-list/character-list.component';
import Character from '../../interfaces/chatacter.interface';
import { CharacterAddComponent } from "../../components/dragonball/character-add/character-add.component";

@Component({
  selector: 'dragonball-super-page',
  templateUrl: './dragonball-super-page.component.html',
  imports: [CharacterListComponent, CharacterAddComponent],
})
export class DragonballSuperPageComponent {

  name = signal<string>('Gohan');
  power = signal<number>(100);


  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9000 },
    { id: 2, name: 'Vegeta', power: 8500 },
    { id: 3, name: 'Gohan', power: 8000 },
  ]);


  addCharacter(newCharacter: Character) {
    this.characters.update((prev) => [...prev, newCharacter]);
    this.resetForm();
  }

  resetForm() {
    this.name.set('');
    this.power.set(0);
  }
}
