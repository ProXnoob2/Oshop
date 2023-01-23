import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

import { BsNavbarComponent } from './Components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './Components/home/home.component';

@NgModule({
  declarations: [BsNavbarComponent, HomeComponent],
  imports: [SharedModule, RouterModule.forChild([])],
  exports: [BsNavbarComponent],
})
export class CoreModule {}
