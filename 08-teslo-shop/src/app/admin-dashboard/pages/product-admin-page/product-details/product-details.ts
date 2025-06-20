import { ProductCarousel } from '@/products/components/product-carousel/product-carousel';
import { Product } from '@/products/interfaces/product.interface';
import { ProductsServices } from '@/products/services/products.service';
import { FormErrorLabel } from '@/shared/components/form-error-label/form-error-label';
import { FormUtils } from '@/utils/form-utils';
import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'product-details',
  imports: [ProductCarousel, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './product-details.html'
})
export class ProductDetails implements OnInit {
  product = input.required<Product>()

  router = inject(Router)
  fb = inject(FormBuilder)
  productService = inject(ProductsServices);

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    tags: [''],
    images: [[]],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
  })

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  setFormValue(formLike: Partial<Product>){
    this.productForm.reset(this.product() as any)
    // this.productForm.patchValue(formLike as any)
    this.productForm.patchValue({tags: formLike.tags?.join(',')})
  }

  onSizeClick(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];

    if(currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size),1);
    }else {
      currentSizes.push(size);
    }

    this.productForm.patchValue({sizes: currentSizes})
  }

  onSubmit() {
    const isValid = this.productForm.valid
    this.productForm.markAllAsTouched()

    if(!isValid) return;
    const formValue = this.productForm.value;

    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags: formValue.tags?.toLowerCase()
        .split(",")
        .map(tag => tag.trim()) ?? [],
    }

    if(this.product().id === 'new'){
      this.productService.createProduct(productLike).subscribe(
        product => this.router.navigate(['/admin/products/', product.id])
      )
    }else{      
      this.productService.updateProduct(this.product().id, productLike).subscribe(
        product => {
          console.log("Producto actualizado")
        }
      );
    }
  }
}
