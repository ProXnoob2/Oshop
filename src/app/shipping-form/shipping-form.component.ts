import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from '../Models/order';
import { ShoppingCart } from '../Models/shopping-cart';
import { AuthService } from '../Services/auth/auth.service';
import { OrderService } from '../Services/order/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shipping = {};
  userSubscription!: Subscription;
  userId!: any;

  @Input('cart') cart!: ShoppingCart;

  constructor(
    private orderService: OrderService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSubscription = this.auth.user$.subscribe(
      (user) => (this.userId = user?.uid)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['order-success', result.key]);
  }
}
