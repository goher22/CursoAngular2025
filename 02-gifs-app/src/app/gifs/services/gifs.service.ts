import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment';
import { GiphyResponse } from '../interfaces/giphy';
import { Gif } from '../interfaces/gif';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const GIF_KEY = 'gifs'

const loadFromLocalStorage = () => {
  try {
    const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
    return JSON.parse(gifsFromLocalStorage);
  }
  catch (error) {
    console.error('Error parsing gifs from local storage', error);
    return {};
  }
}

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(true);

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKey = computed(()=> Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifToLocalStorage = effect(() => {
    const searchHistoryString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, searchHistoryString);
  })

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

  getSearchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: '20',
        q: query,
      }
    }).pipe(
      map(({data}) => data),
      map((item) => {
        return GifMapper.mapGiphyItemsToGifsArray(item);
      }),
      tap(item => {
        this.searchHistory.update((history) => {
          return {
            ...history,
            [query.toLocaleLowerCase()]: item,
          };
        });
      })
    );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query.toLocaleLowerCase()] ?? [];
  }
}
