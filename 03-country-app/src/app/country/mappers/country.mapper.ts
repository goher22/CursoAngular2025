import { Country } from "../interfaces/country.interface";
import { RestCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {
    static maRestCountryToCountry(country: RestCountry): Country {
        return {
            capital: country.capital.join(','),
            cca2: country.cca2,
            flag: country.flags.png,
            flagSvg: country.flags.svg,
            name: country.name.common,
            population: country.population
        };
    }

    static maRestCountryArrayCountry  (countries: RestCountry[]): Country[] {
        return countries.map((country: RestCountry) => this.maRestCountryToCountry(country));
    }
} 