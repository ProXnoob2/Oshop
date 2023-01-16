import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Product } from '../Models/product';
import { ProductService } from '../Services/product/product.service';
import { ShoppingCartService } from '../Services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category!: any;
  cart!: any;
  subscription!: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {
    productService
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = products;
          return route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');

        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      });
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart())
      .snapshotChanges()
      .subscribe({
        next: (cart) => {
          this.cart = cart;
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
