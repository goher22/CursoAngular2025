import { Component, signal } from '@angular/core';
import Character from '../../../interfaces/chatacter.interface';

@Component({
  selector: 'app-character-add',
  templateUrl: './character-add.component.html',
})
export class CharacterAddComponent {
  name = signal<string>('Gohan');
  power = signal<number>(100);

    addCharacter() {
      if(!this.name() || !this.power() || this.power() <= 0) return;
  
      const newCharacter: Character = {
        // id: this.characters().length + 1,
        id: 1000,
        name: this.name(),
        power: this.power()
      }
      // this.characters.update((prev) => [...prev, newCharacter]);
      console.log(newCharacter);
      this.resetForm();
    }
  
    resetForm() {
      this.name.set('');
      this.power.set(0);
    }

}
