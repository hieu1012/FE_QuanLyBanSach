import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { SharedUiModule } from '@emi/shared/ui';
@NgModule({
  imports: [CommonModule, SharedUiModule],
  declarations: [FooterComponent],
  exports: [FooterComponent],
})
export class FooterModule { }
