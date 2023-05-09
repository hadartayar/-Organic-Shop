import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscribable, Subscriber, Subscription, map, of } from 'rxjs';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  public categories$: Observable<any[]> = of([]); //$= observable
  private categoriesSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService) {
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategoriesImmediate();
    console.log(this.categories$);
  }

  onSubmit(product: Object) {
    console.log(product);
    this.productService.create(product);
  }

}

  //second way to get categories from the server:
  // ngOnDestroy() {
  //   this.categoriesSubscription.unsubscribe();
  // }

  // private subscribeToCategories(): void {
  //   this.categoriesSubscription = this._categoryService.categories$.subscribe({
  //     next:
  //       res => {
  //         console.log(res);
  //         this.categories$ = of(res);
  //       },
  //     error: err => console.error(err),
  //   });
  // }



