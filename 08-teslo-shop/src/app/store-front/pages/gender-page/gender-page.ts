import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { ProductsServices } from '@/products/services/products.service';
import { ProductCard } from "../../../products/components/product-card/product-card";

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard],
  templateUrl: './gender-page.html',
})
export class GenderPage {
  route = inject(ActivatedRoute)
  productsServices = inject(ProductsServices);

  productsResource = rxResource({
    params: () => ({gender: this.gender()}),
    stream: ({params}) => this.productsServices.getProducts({gender: params.gender})
  })

  gender = toSignal(
    this.route.params.pipe(
      map(({gender}) => gender )
    )
  );
}
