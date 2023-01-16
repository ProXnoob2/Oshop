import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.auth.login();
  }

  ngOnInit(): void {
    this.auth.user$.subscribe({
      next: (user) => {
        if (user) this.router.navigate(['/']);
      }
    })
  }

}
