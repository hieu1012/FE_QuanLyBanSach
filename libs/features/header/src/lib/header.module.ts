import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';


import { SharedUiModule } from '@emi/shared/ui';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
@NgModule({
  imports: [CommonModule, SharedUiModule, NzDropDownModule, RouterModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule { }
