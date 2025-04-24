import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'gif-history',
  templateUrl: './gif-history-page.component.html',
})
export default class GifHistoryPageComponent {
  query = toSignal(inject(ActivatedRoute).params.pipe(
    map(params => params['query'] || ''))
  );
}
