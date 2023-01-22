import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatModule } from 'app/mat.module';
import { CustomFormsModule } from 'ng2-validation';
import { AuthGuard } from 'shared/Services/auth-guard/auth-guard.service';

import { ManageUsersComponent } from './Components/manage-users/manage-users.component';
import { ManagerUsersFormComponent } from './Components/manager-users-form/manager-users-form.component';
import { ManagerAuthGuard } from './Services/manager-auth-guard/manager-auth-guard.service';

@NgModule({
  declarations: [ManageUsersComponent, ManagerUsersFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatModule,
    CustomFormsModule,
    RouterModule.forChild([
      {
        path: 'manage-users/:id',
        component: ManagerUsersFormComponent,
        canActivate: [AuthGuard, ManagerAuthGuard],
      },
      {
        path: 'manage-users',
        component: ManageUsersComponent,
        canActivate: [AuthGuard, ManagerAuthGuard],
      },
    ]),
  ],
  providers: [ManagerAuthGuard],
})
export class ManagerModule {}
