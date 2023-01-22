import { Component, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { AuthService } from 'shared/Services/auth/auth.service';
import { OrderService } from '../../../shared/Services/order/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  userOrders$!: any;
  subscription!: Subscription;

  constructor(private orderService: OrderService, private auth: AuthService) {}

  ngOnInit(): void {
    this.userOrders$ = this.auth.user$.pipe(
      switchMap((user: any) => {
        return this.orderService.getOrdersByUser(user.uid);
      })
    );
  }

  cancel(orderId: string) {
    this.orderService.fakeOrderCancelation(orderId);
  }
}
