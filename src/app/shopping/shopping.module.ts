import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatModule } from 'app/mat.module';
import { AuthGuard } from 'shared/Services/auth-guard/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { CheckOutComponent } from './Components/check-out/check-out.component';
import { MyOrdersComponent } from './Components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './Components/order-success/order-success.component';
import { ProductFilterComponent } from './Components/products/product-filter/product-filter.component';
import { ProductsComponent } from './Components/products/products.component';
import { ShippingFormComponent } from './Components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './Components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { ViewOrderComponent } from './Components/view-order/view-order.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ViewOrderComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },

      {
        path: 'order-success/:id',
        component: OrderSuccessComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'order-details/:id',
        component: ViewOrderComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'check-out',
        component: CheckOutComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'my/orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
})
export class ShoppingModule {}
