import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  value = output<string>();
  debounceTime = input(300);
  initialValue = input.required<string>()
  placeholder = input<string>();

  inputValue = linkedSignal(()=>this.initialValue() ?? "");

  debounceEffect = effect((onCleanup)=> {
    const value = this.inputValue();

    const timeout = setTimeout(()=>{
      this.value.emit(value)
    }, this.debounceTime())

    onCleanup(()=> {
      clearTimeout(timeout)
    })
  })
}
