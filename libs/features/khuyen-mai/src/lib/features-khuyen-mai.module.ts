import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KhuyenMaiComponent } from './khuyen-mai.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports     : [CommonModule, RouterModule.forChild([
    {
      path     : '',
      component: KhuyenMaiComponent,
    },
  ]),],
  declarations: [KhuyenMaiComponent],
})
export class FeaturesKhuyenMaiModule {
}
