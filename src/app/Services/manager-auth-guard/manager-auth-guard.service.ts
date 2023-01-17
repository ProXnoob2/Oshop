import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerAuthGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(): Observable<boolean> | any {
    return this.auth.appUser$.pipe(
      map((appUser: any) => appUser?.isManager == true)
    );
  }
}
