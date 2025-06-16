import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { ProductResponse } from "../interfaces/product.interface";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";

const baseUrl = environment.baseUrl;

interface Options {
    limit?: number
    offset?: number
    gender?: number
}

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
}