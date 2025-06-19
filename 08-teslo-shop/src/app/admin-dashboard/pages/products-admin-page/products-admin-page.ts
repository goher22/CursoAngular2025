import { ProductTable } from '@/products/components/product-table/product-table';
import { ProductsServices } from '@/products/services/products.service';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Pagination } from "../../../shared/components/pagination/pagination/pagination";

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable, Pagination],
  templateUrl: './products-admin-page.html'
})
export class ProductsAdminPage {
  productsService = inject(ProductsServices);
  paginationService = inject(PaginationService);

  productsPerPage = signal(10);

  productsResource = rxResource({
    params: () => ({page: this.paginationService.currentPage() - 1, limit: this.productsPerPage()}),
    stream: ({params}) => this.productsService.getProducts({
      offset: params.page,
      limit: params.limit
    })
  })
}
