import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    FormsModule,
    SwiperModule,
    ReactiveFormsModule,
    NzNotificationModule
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
