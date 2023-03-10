import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from 'shared/Models/app-user';
import { ShoppingCart } from 'shared/Models/shopping-cart';
import { AuthService } from 'shared/Services/auth/auth.service';
import { ShoppingCartService } from '../../../shared/Services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser | any;
  cart$!: Observable<ShoppingCart>;

  constructor(
    public auth: AuthService,
    private cartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser: any) => (this.appUser = appUser));
    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    this.auth.logout();
  }
}
