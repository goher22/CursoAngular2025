import { Component, input } from '@angular/core';
import { GifListItemComponent } from "./gif-list-item/gif-list-item.component";
import { Gif } from '../../interfaces/gif';

@Component({
  selector: 'gif-list',
  templateUrl: './gif-list.component.html',
  imports: [GifListItemComponent],
})
export class GifListComponent {
  gifs = input.required<Gif[]>();
}
