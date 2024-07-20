import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppUser } from 'shared/Models/app-user';
import { ShoppingCart } from 'shared/Models/shopping-cart';
import { AuthService } from 'shared/Services/auth/auth.service';
import { ShoppingCartService } from '../../../shared/Services/shopping-cart/shopping-cart.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'shared/Components/confirmation-dialog/confirmation-dialog.component';
import { SnackbarService } from 'shared/Services/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent implements OnInit, OnDestroy{
  appUser: AppUser | any;
  cart$!: Observable<ShoppingCart>;
  private dialog$: Subscription = new Subscription;

  constructor(
    public auth: AuthService,
    private cartService: ShoppingCartService,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser: any) => (this.appUser = appUser));
    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        action: "Log Out"
      },
    });

    this.dialog$ = dialogRef.afterClosed().subscribe((res: boolean) => {
      if(res){
        this.auth.logout().then(() => {
          this.router.navigateByUrl('/');
        })
      }
      else this.snackbar.openSnackBar("Log Out Cancelled", 2000);
    })
  }

  ngOnDestroy(): void {
    this.dialog$.unsubscribe();
  }
}
