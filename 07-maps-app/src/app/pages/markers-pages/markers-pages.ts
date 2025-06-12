import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';

import { environment } from '../../../environments/environment';

mapboxgl.accessToken = environment.mapboxkey

@Component({
  selector: 'app-markers-pages',
  imports: [],
  templateUrl: './markers-pages.html'
})
export class MarkersPages implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map|null>(null)

  async ngAfterViewInit(): Promise<void> {
    if(!this.divElement()) return;

    await new Promise((resolve) => setTimeout(resolve, 80))

    const element = this.divElement()?.nativeElement;

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.0906827573632, 4.669758169059289],
      zoom: 14,
    });

    const marker = new mapboxgl.Marker({
      draggable: false,
      color: "#000"
    })
      .setLngLat([-74.0906827573632, 4.669758169059289])
      .addTo(map)

    marker.on('dragend', (event) => {
      console.log(event);
    })

    this.mapListeners(map)

  }

  mapListeners(map: mapboxgl.Map) {

  }
}
