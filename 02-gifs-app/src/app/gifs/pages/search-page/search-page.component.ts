import { Component, inject } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  imports: [GifListComponent],
})
export default class SearchPageComponent {

  gifsService = inject(GifsService);
  onSearch(query: string) {
    this.gifsService.getSearchGifs(query);
  }
}
