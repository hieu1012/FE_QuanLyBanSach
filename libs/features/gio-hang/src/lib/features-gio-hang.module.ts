import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GioHangComponent } from './gio-hang.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // QUAN TRỌNG!
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  imports     : [CommonModule, RouterModule.forChild([
    {
      path     : '',
      component: GioHangComponent,
    },
  ]), FormsModule, NzNotificationModule],
  declarations: [GioHangComponent],
})
export class FeaturesGioHangModule {
}
