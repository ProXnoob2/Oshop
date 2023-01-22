import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCardComponent } from './Components/product-card/product-card.component';
import { ProductQuantityComponent } from './Components/product-quantity/product-quantity.component';
import { AuthGuard } from './Services/auth-guard/auth-guard.service';
import { AuthService } from './Services/auth/auth.service';
import { CategoryService } from './Services/category/category.service';
import { OrderService } from './Services/order/order.service';
import { ProductService } from './Services/product/product.service';
import { ShoppingCartService } from './Services/shopping-cart/shopping-cart.service';
import { UserService } from './Services/user/user.service';

@NgModule({
  declarations: [ProductCardComponent, ProductQuantityComponent],
  exports: [ProductCardComponent, ProductQuantityComponent],
  imports: [CommonModule],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
  ],
})
export class SharedModule {}
