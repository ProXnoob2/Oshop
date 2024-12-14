import { ShoppingCart } from './shopping-cart';
import { Voucher } from './voucher';

export class Order {
  datePlaced!: number;
  originalTotal!: number;
  voucher!: Voucher
  total!: number;
  items!: any;

  constructor(
    public userId: string,
    public shipping: any,
    shoppingCart: ShoppingCart,
  ) {
    this.datePlaced = new Date().getTime();
    this.originalTotal = shoppingCart.originalTotalPrice;
    this.voucher = shoppingCart.voucher;
    this.total = shoppingCart.totalPrice;

    this.items = shoppingCart.items.map((cartItem) => {
      return {
        product: {
          title: cartItem.title,
          imageUrl: cartItem.imageUrl,
          price: cartItem.price,
        },
        quantity: cartItem.quantity,
        totalPrice: cartItem.totalPrice,
      };
    });
  }
}
