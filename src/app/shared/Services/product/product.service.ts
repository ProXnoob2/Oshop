import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Product } from 'shared/Models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[] | any> {
    return this.db
      .list<Product>('/products')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  get(productId: string | number) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId: string | number, product: any) {
    return this.db.object('/products/' + productId).update(product);
  }

  remove(productId: string | number) {
    return this.db.object('/products/' + productId).remove();
  }
}
