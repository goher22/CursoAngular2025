import { Component } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'gifs-side-menu-header',
  templateUrl: './side-menu-header.component.html',
})
export class SideMenuHeaderComponent {

  envs = environment

}
