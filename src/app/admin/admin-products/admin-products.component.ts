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

  constructor(private productService: ProductService) { }
  displayedColumns: string[] = ['title', 'price'];

  ngOnInit(): void {
    //this.subscribeToProducts();
    this.products$ = this.productService.getAllProducts();
  }

}
