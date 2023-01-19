import { ShoppingCart } from './shopping-cart';

export class Order {
  datePlaced!: number;
  items!: any;

  constructor(
    public userId: string,
    public shipping: any,
    shoppingCart: ShoppingCart
  ) {
    this.datePlaced = new Date().getTime();

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
