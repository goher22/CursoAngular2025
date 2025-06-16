import { rxResource } from '@angular/core/rxjs-interop';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsServices } from '@/products/services/products.service';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.html'
})
export class ProductPage {
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductsServices);

  productIdSlug: string = this.activatedRoute.snapshot.params['isSlug'];


  productResource = rxResource({
    params: () => ({idSlug: this.productIdSlug}),
    stream: ({params}) => this.productService.getProductByIdSlug(params.idSlug)
  })

}
