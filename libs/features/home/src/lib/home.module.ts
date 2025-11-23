import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';


import { RouterModule } from '@angular/router';
import { homeRoutes } from './home.routes';

import { SharedUiModule } from '@emi/shared/ui';

import { SwiperModule } from 'swiper/angular';
@NgModule({
  imports: [CommonModule, RouterModule.forChild(homeRoutes), SharedUiModule, SwiperModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule { }
