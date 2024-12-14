import { Product } from 'shared/Models/product';
import { ShoppingCartItem } from './shopping-cart-item';
import { Voucher } from './voucher';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  voucher: Voucher = this.emptyVoucher;

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

  applyVoucher(voucher?: Voucher){
    if(voucher) this.voucher = voucher;
    else this.voucher = this.emptyVoucher;
  }

  get originalTotalPrice(){
    return this.calculateTotalPrice();
  }

  get totalPrice() {
    let sum = this.calculateTotalPrice();
    sum = sum - (this.voucher.discountPercent/100)*sum;
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.itemsMap)
      count += this.itemsMap[productId as any].quantity;
    return count;
  }


  private calculateTotalPrice(): number{
    let sum = 0;
    for (let productId in this.items) sum += this.items[productId].totalPrice;
    return sum;
  }

  private get emptyVoucher(){
    return {
      key: "",
      title: "",
      discountPercent: 0,
      limit: 0
    }
  }
}
