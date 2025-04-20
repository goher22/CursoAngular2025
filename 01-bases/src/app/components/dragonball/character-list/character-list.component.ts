import { Component, input } from '@angular/core';
import Character from '../../../interfaces/chatacter.interface';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
})
export class CharacterListComponent {
  characters = input.required<Character[]>();
  listName = input.required<string>();

  
}
