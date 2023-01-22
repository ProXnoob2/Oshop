import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatModule } from 'app/mat.module';

import { BsNavbarComponent } from './Components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './Components/home/home.component';

@NgModule({
  declarations: [BsNavbarComponent, HomeComponent],
  imports: [CommonModule, MatModule, RouterModule.forChild([])],
  exports: [BsNavbarComponent],
})
export class CoreModule {}
