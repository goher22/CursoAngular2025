import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { ProductResponse } from "../interfaces/product.interface";
import { Observable, tap } from "rxjs";

export class ProductsServices {
    private http = inject(HttpClient);

    getProducts(): Observable<ProductResponse> {
        return this.http.get<ProductResponse>('http://localhost:3000/api/products')
            .pipe(
                tap(resp => console.log(resp))
            )
    }
}