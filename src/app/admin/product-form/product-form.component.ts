import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  Subscribable,
  Subscriber,
  Subscription,
  map,
  of,
} from 'rxjs';
import { take } from 'rxjs/operators';
import { ConstantPool } from '@angular/compiler';


@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {

  public categories$: Observable<any[]> = of([]); //$= observable
  //private categoriesSubscription: Subscription = new Subscription();

  public product: any = {};
  public id;

  constructor(
    private router: Router, //For navigate
    private route: ActivatedRoute, //For catch Route Params  
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = this.categoryService.getCategoriesImmediate();
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if (this.id) {
      this.productService.getById(this.id).pipe(take(1)).subscribe(p => {
        this.product = p;
        console.log(this.product);
      });

    }
  }

  ngOnInit() { }

  onSubmit(product: Object) {
    console.log(product);
    if (this.id)
      this.productService.update(this.id, product);
    else
      this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm("Are you sure you want to delete this product?"))
      return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
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
