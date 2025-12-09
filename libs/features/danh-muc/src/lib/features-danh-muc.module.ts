import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DanhMucSachComponent } from './danh-muc-sach.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // QUAN TRỌNG!

@NgModule({
  imports     : [CommonModule, RouterModule.forChild([
    {
      path     : '',
      component: DanhMucSachComponent,
    },
  ]),
    FormsModule],
  declarations: [DanhMucSachComponent],
})
export class FeaturesDanhMucModule {
}
