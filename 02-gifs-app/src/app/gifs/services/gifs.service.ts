import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { GiphyResponse } from '../interfaces/giphy';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient);

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs(): void {
    this.http.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: '20',
      }
    }).subscribe((response) => {
      console.log(response);
    }
    );
  }
}
