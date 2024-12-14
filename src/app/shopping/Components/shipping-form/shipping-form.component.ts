import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Order } from 'shared/Models/order';
import { ShoppingCart } from 'shared/Models/shopping-cart';
import { Voucher } from 'shared/Models/voucher';
import { AuthService } from 'shared/Services/auth/auth.service';
import { OrderService } from 'shared/Services/order/order.service';
import { VouchersService } from 'shared/Services/vouchers/vouchers.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shipping = {};
  userSubscription!: Subscription;
  userId!: any;
  vouchers: Voucher[] = [];

  @Input('cart') cart!: ShoppingCart;

  constructor(
    private orderService: OrderService,
    private auth: AuthService,
    private router: Router,
    private vouchersService: VouchersService
  ) {}

  ngOnInit() {
    this.userSubscription = this.auth.user$.subscribe(
      (user) => (this.userId = user?.uid)
    );

    this.populateVouchers();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['order-success', result.key]);
  }

  private populateVouchers() {
    this.vouchersService
      .getVouchers()
      .pipe(
        map((vouchers) => {
          this.vouchers = vouchers;
        })
      )
      .subscribe();
  }

  applyVoucher(event: any){
    if(event.value) this.cart.applyVoucher(event.value)
    else this.cart.applyVoucher()
  }
}
