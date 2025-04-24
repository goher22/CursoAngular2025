import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment';
import { GiphyResponse } from '../interfaces/giphy';
import { Gif } from '../interfaces/gif';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  searchGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(true);
  searchGifsLoading = signal<boolean>(true);

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs(): void {
    this.http.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: '20',
      }
    })
    .subscribe((response) => {
      const gifs = GifMapper.mapGiphyItemsToGifsArray(response.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
    }
    );
  }

  getSearchGifs(query: string): void {
    this.http.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: '20',
        q: query,
      }
    })
    .subscribe((response) => {
      const gifs = GifMapper.mapGiphyItemsToGifsArray(response.data);
      this.searchGifs.set(gifs);
      this.searchGifsLoading.set(false);
    }
    );
  }
}
