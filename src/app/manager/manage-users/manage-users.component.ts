import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { AppUser } from 'src/app/Models/app-user';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnDestroy {
  users: AppUser[] | any = [];
  subscription!: Subscription;

  displayedColumns: string[] = ['name', 'email', 'edit'];
  dataSource: any = new MatTableDataSource<AppUser>(this.users);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) {
    this.subscription = this.userService.getAll().subscribe({
      next: (users) => {
        this.users = users;
        this.dataSource.data = this.users;
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(value: string) {
    this.dataSource.data = this.users;
    this.dataSource.data = value
      ? this.dataSource.data.filter((user: any) =>
          user.name.toLowerCase().includes(value.toLowerCase())
        )
      : this.users;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
