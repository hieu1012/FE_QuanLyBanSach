import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChiTietSanPhamComponent } from './chi-tiet-san-pham.component';
import { RouterModule, Routes } from '@angular/router';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
const routes: Routes = [
  {
    path: ':id',                    // Đây là chỗ quan trọng: có :id
    component: ChiTietSanPhamComponent
  },
  // Optional: redirect nếu vào /san-pham không có id
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, RouterModule, NzNotificationModule],
  exports: [RouterModule],
  declarations: [ChiTietSanPhamComponent]
})
export class FeaturesChiTietSanPhamModule {}
