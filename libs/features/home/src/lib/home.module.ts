import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';


import { RouterModule } from '@angular/router';
import { homeRoutes } from './home.routes';

import { SharedUiModule } from '@emi/shared/ui';

import { SwiperModule } from 'swiper/angular';
import { NzNotificationModule } from 'ng-zorro-antd/notification';


@NgModule({
  imports     : [CommonModule, RouterModule.forChild(homeRoutes), SharedUiModule, SwiperModule, NzNotificationModule],
  declarations: [HomeComponent],
  exports     : [HomeComponent],
})
export class HomeModule {
}
