import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GioiThieuComponent } from './gioi-thieu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports     : [CommonModule, RouterModule.forChild([
    {
      path     : '',
      component: GioiThieuComponent,
    },
  ])],
  declarations: [GioiThieuComponent],
})
export class FeaturesGioiThieuModule {
}
