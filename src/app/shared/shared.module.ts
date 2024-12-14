import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule } from '@angular/forms';
import { MatModule } from 'app/mat.module';

import { ProductCardComponent } from './Components/product-card/product-card.component';
import { ProductQuantityComponent } from './Components/product-quantity/product-quantity.component';
import { AuthGuard } from './Services/auth-guard/auth-guard.service';
import { AuthService } from './Services/auth/auth.service';
import { CategoryService } from './Services/category/category.service';
import { OrderService } from './Services/order/order.service';
import { ProductService } from './Services/product/product.service';
import { ShoppingCartService } from './Services/shopping-cart/shopping-cart.service';
import { UserService } from './Services/user/user.service';
import { SnackbarService } from './Services/snackbar/snackbar.service';
import { ConfirmationDialogComponent } from './Components/confirmation-dialog/confirmation-dialog.component';
import { VouchersService } from './Services/vouchers/vouchers.service';

@NgModule({
  declarations: [ProductCardComponent, ProductQuantityComponent, ConfirmationDialogComponent],
  imports: [
    CommonModule,
    MatModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    ConfirmationDialogComponent,
    CommonModule,
    MatModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
    SnackbarService,
    VouchersService
  ],
})
export class SharedModule {}
