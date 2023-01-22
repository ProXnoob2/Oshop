import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from '@firebase/util';
import { map, switchMap } from 'rxjs';
import { AuthService } from 'shared/Services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(): Observable<boolean> | any {
    return this.auth.appUser$.pipe(
      map((appUser: any) => appUser?.isAdmin == true)
    );
  }
}
