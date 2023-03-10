import { Product } from 'shared/Models/product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};

    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      let x = new ShoppingCartItem({ ...item, key: productId });
      this.items.push(x);
    }
  }

  getQuantity(product: Product) {
    if (this.itemsMap === null || !this.itemsMap) return 0;
    else {
      let item = this.itemsMap[product.key];
      return item ? item.quantity : 0;
    }
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) sum += this.items[productId].totalPrice;
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.itemsMap)
      count += this.itemsMap[productId as any].quantity;
    return count;
  }
}
