import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { ConfirmationDialogComponent } from 'shared/Components/confirmation-dialog/confirmation-dialog.component';
import { AppUser } from 'shared/Models/app-user';
import { AuthService } from 'shared/Services/auth/auth.service';
import { UserService } from 'shared/Services/user/user.service';

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
  private dialog$: Subscription = new Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private dialog: MatDialog
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        action: "Remove This User"
      },
    });

    this.dialog$ = dialogRef.afterClosed().subscribe((res: boolean) => {
      if(res){
        this.userService.remove(this.userId).then(() => {
          this.router.navigate(['/manage-users']);
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
