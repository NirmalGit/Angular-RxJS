import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  catchError,
  combineLatest,
  EMPTY,
  filter,
  map,
  Observable,
  of,
  startWith,
  Subject,
  Subscription,
} from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';
import { ProductCategoryService } from '../product-categories/product-category.service';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  // categories: ProductCategory[] = [];
  categories$ = this.productCategoriesService.productCategories$;
  private categorySelectedSubject = new Subject<number>();
  categorySelectedId$ = this.categorySelectedSubject.asObservable();

  selectedCategoryId = 1;

  // products: Product[] = [];

  // products$ = this.productService.productsWithCategory$.pipe(
  //   catchError((err) => {
  //     this.errorMessage = err;
  //     return EMPTY;
  //   })
  // );

  products$ = combineLatest([
    this.productService.productsWithCategory$,
    this.categorySelectedId$.pipe(
      startWith(0)
    ),
  ]).pipe(
    map(([products, selectedCategoryId]) =>
      products.filter((product) =>
        selectedCategoryId ? product.categoryId === selectedCategoryId : true
      )
    ),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  // sub!: Subscription;

  //productsSimpleFilters
  productsSimpleFilter$ = this.productService.productsWithCategory$.pipe(
    map((products) =>
      products.filter((product) => {
        return this.selectedCategoryId
          ? product.categoryId === this.selectedCategoryId
          : true;
      })
    )
  );

  constructor(
    private productService: ProductService,
    private productCategoriesService: ProductCategoryService
  ) {}

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
    //console.log('Not yet implemented');
    // this.selectedCategoryId = +categoryId;
    // this.categorySelectedId$.next(+categoryId);
    this.categorySelectedSubject.next(+categoryId);
  }
}
