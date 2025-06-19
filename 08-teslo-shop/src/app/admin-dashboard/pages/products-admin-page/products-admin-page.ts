import { ProductTable } from '@/products/components/product-table/product-table';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable],
  templateUrl: './products-admin-page.html'
})
export class ProductsAdminPage {

}
