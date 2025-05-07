import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string) {
  queryParam = queryParam.toLowerCase()
  const validRegions : Record<string, Region> = {
    'africa' : 'Africa',
    'americas' : 'Americas',
    'asia' : 'Asia',
    'europe' : 'Europe',
    'oceania' : 'Oceania',
    'antarctic' : 'Antarctic'
  }

  return validRegions[queryParam] ?? 'Americas'
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  countryService = inject(CountryService);
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  activatedRouter = inject(ActivatedRoute)
  router = inject(Router)

  queryParam = this.activatedRouter.snapshot.queryParamMap.get("query") ?? '';

  selectedRegion = linkedSignal<Region|null>(()=> validateQueryParam(this.queryParam))

  selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }

  countryResource = rxResource({
    request: () => ({region: this.selectedRegion()}),
    loader: ({request}) => {
      if(!request.region) return of([])
        this.router.navigate(['/country/by-region'], {
          queryParams: {
            query: request.region
          }
        })
      return this.countryService.searchByRegion(request.region)
    }
  })

}
