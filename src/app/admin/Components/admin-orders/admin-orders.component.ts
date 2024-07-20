import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/Services/order/order.service';
import { SnackbarService } from 'shared/Services/snackbar/snackbar.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit {
  orders$!: any;

  constructor(private orderService: OrderService, private snackbar: SnackbarService) {}

  ngOnInit(): void {
    this.orders$ = this.orderService.getAll();
  }

  remove(orderId: string) {
      this.orderService.remove(orderId).then(() => {
        this.snackbar.openSnackBar("Order removed", 1500)
      })
  }
}
