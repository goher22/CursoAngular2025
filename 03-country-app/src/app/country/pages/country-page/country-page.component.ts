import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NoFoundComponent } from '../../../shared/components/no-found/no-found.component';
import { CountryInformationComponent } from './components/country-information/country-information.component';

@Component({
  selector: 'app-country-page',
  imports: [NoFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  countryCode = inject(ActivatedRoute).snapshot.params['code']
  countryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({code: this.countryCode}),
    loader: ({request}) => {
      return this.countryService.searchByAlphaCode(request.code)
    }
  });
}
