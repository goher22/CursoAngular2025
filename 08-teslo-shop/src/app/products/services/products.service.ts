import { Observable, of, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
import { Gender, Product, ProductResponse } from "../interfaces/product.interface";
import { User } from "@/auth/interfaces/user.interface";

const baseUrl = environment.baseUrl;

interface Options {
    limit?: number
    offset?: number
    gender?: number
}

const emptyProduct: Product = {
    id: "new",
    title: "",
    price: 0,
    description: "",
    slug: "",
    stock: 0,
    sizes: [],
    gender: Gender.Men,
    tags: [],
    images: [],
    user: {} as User
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

        if(idProduct === 'new'){
            return of(emptyProduct)
        }

        return this.http.get<Product>(`${baseUrl}/products/${idProduct}`)
        .pipe(tap((product) => console.log(product)))
    }

    updateProduct(id:string, productLike: Partial<Product>): Observable<Product> {
        return this.http.patch<Product>(`${baseUrl}/products/${id}`, productLike)
    }

    createProduct(productLike: Partial<Product>): Observable<Product> {
        return this.http.post<Product>(`${baseUrl}/products`, productLike)
    }
}