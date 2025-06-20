import { Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
import { Product, ProductResponse } from "../interfaces/product.interface";

const baseUrl = environment.baseUrl;

interface Options {
    limit?: number
    offset?: number
    gender?: number
}

@Injectable({
    providedIn: 'root'
})
export class ProductsServices {
    private http = inject(HttpClient);

    getProducts(options:Options): Observable<ProductResponse> {
        const {limit = 9, offset = 0, gender = '' } = options;
        return this.http.get<ProductResponse>(`${baseUrl}/products`, 
            {
                params: {
                    limit,
                    offset,
                    gender
                },
            })
            .pipe(
                tap(resp => console.log(resp))
            )
    }

    getProductByIdSlug(idSlug: string): Observable<Product>{
        return this.http.get<Product>(`${baseUrl}/products/${idSlug}`)
            .pipe(
                tap(resp => console.log(resp))
            )
    }

    getProductById(idProduct: string): Observable<Product> {
        return this.http.get<Product>(`${baseUrl}/products/${idProduct}`)
        .pipe(tap((product) => console.log(product)))
    }

  updateProduct(id:string, productLike: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${baseUrl}/products/${id}`, productLike)
  }
}