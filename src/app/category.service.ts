import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // categories: any[] = [];
  public categories$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private db: AngularFireDatabase) {}

  public getCategoriesImmediate(): Observable<any[]> {
    return this.db
      .list('/categories')
      .valueChanges()
      .pipe(
        map((categories) => {
          return categories;
        })
      );
  }

  //Second Way
  // public getCategories(): void {
  //   this.db.list('/categories').valueChanges().subscribe(
  //     categories => {
  //       this.categories$.next(categories);
  //     });
  // }
}
