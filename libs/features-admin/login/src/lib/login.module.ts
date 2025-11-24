import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    FormsModule,
    SwiperModule,
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
