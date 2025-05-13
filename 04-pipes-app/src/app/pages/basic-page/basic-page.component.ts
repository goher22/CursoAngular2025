import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { AvailableLocale, LocalService } from '../../services/local.service';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.component.html',
})
export default class BasicPageComponent {

  localeService = inject(LocalService);
  currentLocale = signal(inject(LOCALE_ID));

  nameLower = signal('carlos');
  nameUpper = signal('CARLOS');
  fullName = signal('cArLoS gOmEz');

  customDate = signal(new Date());

  tickingDateEffect = effect((onCleanup) => {
    const interval = setInterval(() => {
      this.customDate.set(new Date());
    }, 1000);

    onCleanup(() => {
      clearInterval(interval);
    });
  });

  changeLocale(locale: AvailableLocale) {
    this.localeService.changeLocale(locale);
  }

}
