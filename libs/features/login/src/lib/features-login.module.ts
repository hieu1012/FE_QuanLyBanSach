import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
@NgModule({
  imports     : [CommonModule, RouterModule.forChild([
    {
      path     : '',
      component: LoginComponent,
    },
  ]),
    FormsModule,
    NzNotificationModule
  ],
  declarations: [LoginComponent],
})
export class FeaturesLoginModule {
}
