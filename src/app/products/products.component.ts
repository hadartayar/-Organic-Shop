import { Component } from '@angular/core';
import { Observable, of, map, take } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/models/product';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';


type ProductWithKey = { key: string, product: Product };

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$: Observable<ProductWithKey[]> = of([]);
  products: ProductWithKey[] = [];
  categories$: Observable<any[]> = of([]);
  category: string = "";

  constructor(
    private router: Router, //For navigate
    private route: ActivatedRoute, //For catch Route Params 
    private productService: ProductService,
    categoryService: CategoryService) {
    this.products$ = this.productService.getAllProducts().pipe(
      map(result => {
        let productsWithKeys: Array<ProductWithKey> = result.map((p: any) => {
          let productWithKey: ProductWithKey = {
            key: p.key,
            product: p.payload.val()
          }
          return productWithKey;
        })
        return productsWithKeys;
      })
    );

    this.products$.pipe(take(1)).subscribe(
      prods => {
        this.products = prods;
      }
    );


    //Handle Categories:
    this.categories$ = categoryService.getCategories();
    console.log(this.categories$)

    //just for me to see the values:
    this.categories$.pipe(take(1)).subscribe(
      cats => {
        console.log(cats);
      }
    );
  }

  // TO DO!! 
  // route.queryParamMap.subscribe(params => {
  //   this.category = params.get('category');
  //   this.filterProducts = (this.category) ?
  //     this.products.filter(p => p.category === this.category)
  // });


  // filterCategory(cat: string) {
  //   //this.route.params = 'category: c.name';
  //   // this.router.navigate(['category', cat]);
  //   this.router.navigate(['/category', { id: cat.toLowerCase() }]);
  // }

}
