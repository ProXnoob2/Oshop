import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { AppUser } from 'src/app/Models/app-user';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-manager-users-form',
  templateUrl: './manager-users-form.component.html',
  styleUrls: ['./manager-users-form.component.scss'],
})
export class ManagerUsersFormComponent {
  userId!: string | null | any;
  user!: AppUser | any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userId = this.route.snapshot.paramMap.get('id');

    if (this.userId)
      this.userService
        .get(this.userId)
        .valueChanges()
        .subscribe({
          next: (user) => {
            this.user = user;
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
}
