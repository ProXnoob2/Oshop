import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Subscription, map } from 'rxjs';
import { Order } from '../../Models/order';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { ConfirmationDialogComponent } from 'shared/Components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class OrderService implements OnDestroy{
  private dialog$: Subscription = new Subscription;

  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService,
    private snackbar: SnackbarService,
    private dialog: MatDialog
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

  // openDialogBox(action: string, timeout: number){
  // }

  fakeOrderCancelation(orderId: string) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          action: "Remove This Order"
        },
      });

      this.dialog$ = dialogRef.afterClosed().subscribe((res: boolean) => {
        if(res){
          setTimeout(async () => {
            await this.remove(orderId);
            this.snackbar.openSnackBar("Order Cancelled", 3000);
          }, 1500);
        }
      })
  }

  remove(orderId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        action: "Remove This Order"
      },
    });

    this.dialog$ = dialogRef.afterClosed().subscribe((res: boolean) => {
      if(res){
        this.db.list('/orders/' + orderId).remove().then(() => {
          this.snackbar.openSnackBar("Order Removed")
        })
      }
    })
  }

  ngOnDestroy(): void {
      this.dialog$.unsubscribe();
  }
}
