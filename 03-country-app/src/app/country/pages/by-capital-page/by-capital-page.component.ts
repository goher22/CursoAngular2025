import { Component, inject, linkedSignal, resource } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);
  
  activatedRouter = inject(ActivatedRoute)
  router = inject(Router)

  queryParam = this.activatedRouter.snapshot.queryParamMap.get("query") ?? '';
  
  query = linkedSignal<string>(()=> this.queryParam ?? "");

  countryResource = resource({
    request: () => ({
      query: this.query()
    }),
    loader: async({request}) => {
      if(!request.query) return [];
      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query
        }
      })
      return await firstValueFrom(this.countryService.searchByCapital(request.query));
    }
  })

  // isLoading = signal(false);
  // isError = signal<string|null>(null);
  // countries = signal<Country[]>([]);
  
  // onSearchByCapital(query: string) {
  //   if(this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query)
  //   .subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err);
  //     }
  //   });
  // }
}
