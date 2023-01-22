import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from '../Models/order';
import { OrderService } from '../Services/order/order.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {
  orderId!: any;
  order$!: Observable<Order>;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    (this.order$ as any) = this.orderService.getOrderById(this.orderId);
  }

  navigateUser() {
    this.location.back();
  }
}
