import { effect, Injectable, signal } from '@angular/core';
import Character from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class DragonBallService {

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9000 },
    { id: 2, name: 'Vegeta', power: 8500 },
    { id: 3, name: 'Gohan', power: 8000 },
  ]);

  saveToLocalStorage = effect (() => {
    localStorage.setItem('characters', JSON.stringify(this.characters()));
  })

  addCharacter(newCharacter: Character) {
    this.characters.update((prev) => [...prev, newCharacter]);
  }
}
