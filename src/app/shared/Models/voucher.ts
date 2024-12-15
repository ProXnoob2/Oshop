export interface Voucher{
  key: string;
  title: string;
  discountPercent: number,
  limit: number,
  validity: boolean,
  lower_price_limit: number,
  upper_price_limit: number,
  applicableUpto: number
}
