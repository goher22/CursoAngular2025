import { Routes } from '@angular/router';
import { FullscreenMapPage } from './pages/fullscreen-map-page/fullscreen-map-page';
import { MarkersPages } from './pages/markers-pages/markers-pages';
import { HousesPage } from './pages/houses-page/houses-page';

export const routes: Routes = [

    {
        path: 'fullscreen',
        component: FullscreenMapPage,
        title: 'Mapa Pantalla Completa',
    },
    {
        path: 'markers',
        component: MarkersPages,
        title: 'Marcadores',
    },
    {
        path: 'houses',
        component: HousesPage,
        title: 'Propiedades disponibles',
    },
    {
        path: '**',
        redirectTo: 'fullscreen'
    },
];
