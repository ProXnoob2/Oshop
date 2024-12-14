import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Voucher } from 'shared/Models/voucher';

@Injectable({
  providedIn: 'root'
})
export class VouchersService {
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
}
