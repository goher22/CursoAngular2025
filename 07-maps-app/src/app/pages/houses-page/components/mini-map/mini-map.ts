import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';

import { environment } from '../../../../../environments/environment';

mapboxgl.accessToken = environment.mapboxkey

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.html',
  styleUrl: './mini-map.css'
})
export class MiniMap implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  lngLat = input.required<{lng: number, lat: number}>();
  zoom = input<number>(14)

  map = signal<mapboxgl.Map|null>(null)

  async ngAfterViewInit(): Promise<void> {
    if(!this.divElement()) return;

    await new Promise((resolve) => setTimeout(resolve, 80))

    const element = this.divElement()?.nativeElement;

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat(),
      zoom: this.zoom(),
      interactive: false
    });

    new mapboxgl.Marker().setLngLat(this.lngLat()).addTo(map)
  }

}
