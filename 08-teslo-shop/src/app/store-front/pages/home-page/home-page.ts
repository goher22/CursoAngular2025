import { rxResource } from '@angular/core/rxjs-interop';
import { Component, inject } from '@angular/core';

import { ProductCard } from '@/products/components/product-card/product-card';
import { ProductsServices } from '@/products/services/products.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
})
export class HomePage {
  productsServices = inject(ProductsServices);

  // productsResource = rxResource({
  //   request: () => ({

  //   }),
  //   loader: () => {
  //     return this.productsServices.getProducts();
  //   },
  // })
}
