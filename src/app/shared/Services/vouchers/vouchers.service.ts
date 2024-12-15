import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable, take } from 'rxjs';
import { Voucher } from 'shared/Models/voucher';

@Injectable({
  providedIn: 'root'
})
export class VouchersService {
  vouchers: Voucher[] = [];

  constructor(private db: AngularFireDatabase) { }

  getVouchers(): Observable<Voucher[] | any>{
    return this.db
    .list<Voucher>('/vouchers')
    .snapshotChanges()
    .pipe(
      map((changes) =>
        changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  get(voucherId: string | number) {
    return this.db.object('/vouchers/' + voucherId).valueChanges();
  }

  update(voucherId: string | number, voucher: Voucher){
    return this.db.object('/vouchers/' + voucherId).update(voucher);
  }

  remove(voucherId: string | number) {
    return this.db.object('/vouchers/' + voucherId).remove();
  }

  checkVouchersValidity(){
    this.getVouchers()
      .pipe((take(1)),
      map((vouchers) => {
        this.vouchers = vouchers;
      })
      )
      .subscribe();
    let todaysTime = new Date().getTime();
    for(let voucher of this.vouchers){
      if(voucher.applicableUpto<todaysTime){
        voucher.validity = false;
        this.update(voucher.key, voucher);
      }
    }

  }
}
