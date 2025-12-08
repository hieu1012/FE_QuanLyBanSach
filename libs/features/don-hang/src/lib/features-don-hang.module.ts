import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonHangComponent } from './don-hang.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([
    {
      path: '',
      component: DonHangComponent,
    },
  ]),],
  declarations: [DonHangComponent],
})
export class FeaturesDonHangModule {}
