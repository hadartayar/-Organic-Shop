import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/product.service';
import { Observable, of, Subscription, map, forkJoin } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
export interface ProductData {
  id: string;
  title: string;
  price: string;
  category: string;
}

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
  public products$: Observable<any[]> = of([]); //$= observable
  public productsKeys$: Observable<any[]> = of([]);
  //public productsSubscription: Subscription = new Subscription();

  constructor(private productService: ProductService) {  }
  displayedColumns: string[] = ['title', 'price'];

  ngOnInit(): void {
    //this.subscribeToProducts();
    this.products$ = this.productService.getAllProducts();
    this.productsKeys$ = this.productService.getAllKeys();
  }
  //   forkJoin([this.products$, this.productsKeys$]).subscribe((results) => {
  //     // results[0] is our character
  //     // results[1] is our character homeworld
  //     results[0].products$ = results[1];
  //     this.productsKeys$ = results[0];
  //   });
  // }


}
