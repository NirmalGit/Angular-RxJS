import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { catchError, EMPTY, Observable, of, Subscription } from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  categories: ProductCategory[] = [];

  // products: Product[] = [];
  products$ = this.productService.product$.pipe(
    catchError(err =>{ 
      this.errorMessage = err ;
       return EMPTY
    })
  )
  // sub!: Subscription;

  constructor(private productService: ProductService) { }

 /* ngOnInit(): void {
    // this.sub = this.productService.getProducts()
    //   .subscribe({
    //     next: products => this.products = products,
    //     error: err => this.errorMessage = err
    //   });
    this.products$ = this.productService.getProducts().pipe(
      catchError(err =>{ 
        this.errorMessage = err ;
         return EMPTY
      })
    )
  }*/

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
