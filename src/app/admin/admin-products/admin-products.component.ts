import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/product.service';
import { Observable, of, Subscription, map, forkJoin, take } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from 'src/app/models/product';

type ProductWithKey = { key: string, product: Product };

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {

  products$: Observable<ProductWithKey[]> = of([]);//Observable<any[]> = of([]); //$= observable
  products: ProductWithKey[] = [];
  //filterProducts: any[] = [];

  constructor(private productService: ProductService) { }
  displayedColumns: string[] = ['title', 'price'];

  ngOnInit(): void {
    //this.products$ = this.productService.getAllProducts(); //if products is Observable
    this.products$ = this.productService.getAllProducts().pipe(
      map(result => {
        let productsWithKeys: Array<ProductWithKey> = result.map((p: any) => {
          let productWithKey: ProductWithKey = {
            key: p.key,
            product: p.payload
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
    // .subscribe(products => {
    //   console.log(products);

    //   // this.filterProducts = this.products = products
    // });
  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

  // filter(query: string) {
  //   this.filterProducts = (query) ?
  //     this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
  //     this.products;
  //   console.log(query);
  // }

}
