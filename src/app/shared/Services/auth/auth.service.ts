import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable, switchMap, of } from 'rxjs';
import { AppUser } from 'shared/Models/app-user';
import { UserService } from '../user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$!: Observable<firebase.User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private snackbar: SnackbarService
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider).then(() => {
      this.snackbar.openSnackBar("Successfully logged in", 3000)
      this.router.navigateByUrl(returnUrl)
    })
    .catch(() => {
      this.snackbar.openSnackBar("Unable to log in", 4000)
      this.router.navigateByUrl(returnUrl)
    })
  }

  logout() {
    return this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser | null> {
    return this.user$.pipe(
      switchMap((user: any) => {
        if (user) return this.userService.get(user?.uid).valueChanges();
        else return of(null);
      })
    );
  }
}
