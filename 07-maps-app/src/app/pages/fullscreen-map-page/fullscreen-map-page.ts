import mapboxgl from 'mapbox-gl';
import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';

import { environment } from '../../../environments/environment';


mapboxgl.accessToken = environment.mapboxkey

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [],
  templateUrl: './fullscreen-map-page.html',
  styles: `
    div {
      width: 100vw;
      height: calc(100vh - 64px);
    }
  `
})
export class FullscreenMapPage implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');

  async ngAfterViewInit(){
    if(!this.divElement()) return;

    await new Promise((resolve) => setTimeout(resolve, 80))

    const element = this.divElement()?.nativeElement;
    console.log(element)

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }
}
