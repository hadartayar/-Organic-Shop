import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public products$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private db: AngularFireDatabase) { }

  create(product: Object) {
    return this.db.list('/products').push(product);
  }

  // getAll(){
  //   return this.db.list('/products');
  // }

  // public getAllProducts(): Observable<any[]> { //Only product without keys
  //   return this.db
  //     .list('/products')
  //     .valueChanges()
  //     .pipe(
  //       map((product) => {
  //         console.log(product);
  //         return product;
  //       })
  //     );
  // }

  public getAllProducts(): Observable<any> {
    return this.db.list('/products').snapshotChanges(); //To get more information I use this
  }

  public getById(productId: any) {
    return this.db.object('/products/' + productId).valueChanges();
  }
}
