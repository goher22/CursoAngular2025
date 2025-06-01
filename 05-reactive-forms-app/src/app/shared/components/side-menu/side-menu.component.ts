import { Component } from '@angular/core';
import reactiveRoutes from '../../../reactive/reactive.routes';
import { RouterLink } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
}

const reactiveRoute = reactiveRoutes[0].children ?? [];



@Component({
  selector: 'app-side-menu',
  imports: [RouterLink],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {

  reactiveMenu: MenuItem[] =  reactiveRoute
  .filter((item) => item.path !== '**')
  .map((item)=> ({
    route: `reactive/${item.path}`,
    title: `${item.title}`
  }));


  authMenu: MenuItem[] = [{
    title: 'Registro',
    route: './auth'
  }]

  country: MenuItem[] = [{
    title: 'Países',
    route: './country'
  }]
  
}
