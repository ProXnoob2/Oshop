import { Component, Input } from '@angular/core';
import { Product } from '../Models/product';
import { ShoppingCartService } from '../Services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input('product') product!: any;
  @Input('shopping-cart') shoppingCart!: any;

  constructor(private cartService: ShoppingCartService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    let item = this.shoppingCart.payload.val().items[this.product.key];
    return item ? item.quantity : 0;
  }
}
