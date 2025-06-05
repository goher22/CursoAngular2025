import { Component } from '@angular/core';

const log = (...messages:string[]) => {
  console.log(
    `${messages[0]} %c${messages.slice(1).join(', ')}`, 
    'color: #bada55'
  )
}

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  constructor() {
    log('Constructor llamado');
  }

  ngOnInit(){
    log(
      "ngOnInit",
      "Runs once after Angular has initialized all the component's inputs."
    );
  }
  ngOnChanges(){
    log(
      "ngOnChanges",
      "Runs every time the component's inputs have changed."
    );
  }
  ngDoCheck(){
    log(
      "ngDoCheck",
      "Runs every time this component is checked for changes."
    );
  }
  ngAfterContentInit(){
    log(
      "ngAfterContentInit",
      "Runs once after the component's content has been initialized."
    );
  }
  ngAfterContentChecked(){
    log(
      "ngAfterContentChecked",
      "Runs every time this component content has been checked for changes."
    );
  }
  ngAfterViewInit(){
    log(
      "ngAfterViewInit",
      "Runs once after the component's view has been initialized."
    );
  }
  ngAfterViewChecked(){
    log(
      "ngAfterViewChecked",
      "Runs every time the component's view has been checked for changes."
    );
  }
  afterEveryRender(){
    log(
      "afterEveryRender",
      "Runs every time all components have been rendered to the DOM."
    );
  }

}
