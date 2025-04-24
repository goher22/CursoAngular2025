import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  imports: [GifListComponent],
})
export default class SearchPageComponent {

  gifsService = inject(GifsService);
  gifs = signal<Gif[]>([]);


  onSearch(query: string) {
    this.gifsService.getSearchGifs(query).subscribe((resp) => {
      this.gifs.set(resp);
    });
  }
}
