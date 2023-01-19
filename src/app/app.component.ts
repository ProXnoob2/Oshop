import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth/auth.service';
import { ShoppingCartService } from './Services/shopping-cart/shopping-cart.service';
import { UserService } from './Services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    auth.user$.subscribe({
      next: (user) => {
        if (user) {
          userService.save(user);
          let returnUrl = localStorage.getItem('returnUrl');
          if (returnUrl) {
            router.navigate([returnUrl]);
            localStorage.removeItem('returnUrl');
          }
        }
      },
    });
  }
}
