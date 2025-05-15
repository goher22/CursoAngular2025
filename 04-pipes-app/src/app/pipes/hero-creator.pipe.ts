import { Pipe, PipeTransform } from '@angular/core';
import { Creator } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroCreator'
})
export class HeroCreatorPipe implements PipeTransform {

  transform(value: Creator): "Marvel" | "DC" {
    return value === Creator.Marvel ? 'Marvel' : 'DC';
  }

}
