import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { SharedUiModule } from '@emi/shared/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
@NgModule({
  imports: [CommonModule, SharedUiModule,
    RouterModule.forChild([
      { path: '', component: RegisterComponent }
    ]),
    NzNotificationModule
  ],

  declarations: [RegisterComponent],
  exports: [RegisterComponent],
})
export class RegisterModule { }
