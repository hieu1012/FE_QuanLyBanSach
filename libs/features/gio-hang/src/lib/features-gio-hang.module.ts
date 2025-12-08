import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GioHangComponent } from './gio-hang.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // QUAN TRỌNG!
@NgModule({
  imports     : [CommonModule, RouterModule.forChild([
    {
      path     : '',
      component: GioHangComponent,
    },
  ]), FormsModule],
  declarations: [GioHangComponent],
})
export class FeaturesGioHangModule {
}
