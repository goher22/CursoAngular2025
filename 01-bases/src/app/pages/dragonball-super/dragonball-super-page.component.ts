import { Component, inject, signal } from '@angular/core';
import { CharacterListComponent } from '../../components/dragonball/character-list/character-list.component';
import Character from '../../interfaces/character.interface';
import { CharacterAddComponent } from "../../components/dragonball/character-add/character-add.component";
import { DragonBallService } from '../../services/dragonball.service';

@Component({
  selector: 'dragonball-super-page',
  templateUrl: './dragonball-super-page.component.html',
  imports: [CharacterListComponent, CharacterAddComponent],
})
export class DragonballSuperPageComponent {

  public dragonBallService = inject(DragonBallService);


}
