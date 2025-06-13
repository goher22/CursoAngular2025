import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';

import { environment } from '../../../environments/environment';
import { v4 as UUIDv4 } from 'uuid'
import { JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxkey

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-pages',
  imports: [JsonPipe],
  templateUrl: './markers-pages.html'
})
export class MarkersPages implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map|null>(null)
  markers = signal<Marker[]>([]);

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
    map.on('click', (event) => this.mapClick(event)); 

    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent){
    if (!this.map()) return;

    const map = this.map()!;
    const color = '#xxxxxx'.replace(/x/g, (y) => ((Math.random() * 16) | 0).toString(16));

    const coords = event.lngLat;

    const mapboxMarker = new mapboxgl.Marker(
      {
        color: color
      }
    ).setLngLat(coords)
    .addTo(map)

    const newMarker: Marker = {
      id: UUIDv4(),
      mapboxMarker: mapboxMarker,
    }

    this.markers.update((value) => [newMarker, ...value]);
  }

  flyToMarker(lngLat: LngLatLike) {
    if(!this.map())return;
    this.map()?.flyTo({
      center: lngLat
    })
  }

  deleteMarker(marker: Marker) {
    if(!this.map()) return;
    const map = this.map()!;
    marker.mapboxMarker.remove();
    this.markers.set(
      this.markers().filter((m) => m.id !== marker.id)
    );
  }

}
