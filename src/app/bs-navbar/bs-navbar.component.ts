import { Component } from '@angular/core';
import { AppUser } from '../Models/app-user';
import { AuthService } from '../Services/auth/auth.service';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent {

  appUser: AppUser | any;

  constructor(public auth: AuthService) {
    this.auth.appUser$.subscribe((appUser: any) => this.appUser = appUser)
  }

  logout() {
    this.auth.logout();
  }

}
