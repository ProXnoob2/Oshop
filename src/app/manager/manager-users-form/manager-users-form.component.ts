import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap, take } from 'rxjs';
import { AppUser } from 'src/app/Models/app-user';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-manager-users-form',
  templateUrl: './manager-users-form.component.html',
  styleUrls: ['./manager-users-form.component.scss'],
})
export class ManagerUsersFormComponent implements OnInit, OnDestroy {
  userId!: string | null | any;
  user: AppUser | any = <AppUser>{};
  subscription!: Subscription;
  myId!: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.handleSelfUser();
  }

  private handleSelfUser() {
    if (this.userId)
      this.subscription = this.auth.user$
        .pipe(
          switchMap((loggedUser: any) => {
            this.myId = loggedUser?.uid;
            return this.userService.get(this.userId).valueChanges();
          })
        )
        .subscribe({
          next: (user) => {
            if (user?.name != undefined) this.user = user;
          },
        });
  }

  save(user: any) {
    if (!user.isAdmin) user.isAdmin = false;
    if (!user.isManager) user.isManager = false;

    this.userService.update(this.userId, user);

    this.router.navigate(['/manage-users']);
  }

  remove() {
    if (!confirm('Are you sure you want to delete this user?')) return;
    else {
      this.userService.remove(this.userId);
      this.router.navigate(['/manage-users']);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
