import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { Order } from '../../Models/order';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService,
    private snackbar: SnackbarService
  ) {}

  async placeOrder(order: any) {
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getAll() {
    return this.db
      .list<Order>('/orders')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  getOrdersByUser(userId: string) {
    return this.db
      .list<Order>('/orders', (ref) =>
        ref.orderByChild('userId').equalTo(userId)
      )
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  getOrderById(orderId: string) {
    return this.db.object<Order>('/orders/' + orderId).valueChanges();
  }

  fakeOrderCancelation(orderId: string) {
    setTimeout(async () => {
      await this.remove(orderId);
      this.snackbar.openSnackBar("Order Canceled", 3000);
    }, 1000);
  }

  remove(orderId: string) {
    return this.db.list('/orders/' + orderId).remove();
  }
}
