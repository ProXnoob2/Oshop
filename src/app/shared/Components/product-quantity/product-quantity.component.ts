import { Component, Input } from '@angular/core';
import { Product } from 'shared/Models/product';
import { ShoppingCartService } from '../../Services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss'],
})
export class ProductQuantityComponent {
  @Input('product') product!: Product;
  @Input('shopping-cart') shoppingCart!: any;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}
