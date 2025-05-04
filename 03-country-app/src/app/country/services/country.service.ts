import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RestCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay, of, tap} from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.trim().toLowerCase();

    if(this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query) ?? [])
    }

    return this.http.get<RestCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map(countries => CountryMapper.maRestCountryArrayCountry(countries)),
      tap(countries => this.queryCacheCapital.set(query, countries)),
      catchError(_ => {
        return throwError(() => new Error('No se encontró un país con esa capital'));
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    const url = `${API_URL}/name/${query}`;

    query = query.trim().toLowerCase();

    return this.http.get<RestCountry[]>(url).pipe(
      map(countries => CountryMapper.maRestCountryArrayCountry(countries)),
      delay(3000),
      catchError(error => {
        return throwError(() => new Error('No se encontró un país con ese nombre'));
      })
    );
  }

  searchByAlphaCode(code: string): Observable<Country | undefined> {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RestCountry[]>(url).pipe(
      map(resp => CountryMapper.maRestCountryArrayCountry(resp)),
      map(countries => countries.at(0)),
      catchError(error => {
        return throwError(() => new Error('No se encontró un país con ese nombre'));
      })
    );
  }

}
