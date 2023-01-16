import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { take } from 'rxjs';
import { Product } from 'src/app/Models/product';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private createCart() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    let result: any = await this.createCart();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe({
        next: (item: any | null) => {
          if (item.payload.exists())
            item$.update({ quantity: item.payload.val().quantity + 1 });
          else item$.set({ product: product, quantity: 1 });
        },
      });
  }
}
