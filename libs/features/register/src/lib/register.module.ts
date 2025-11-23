import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { SharedUiModule } from '@emi/shared/ui';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, SharedUiModule,
    RouterModule.forChild([
      { path: '', component: RegisterComponent }
    ])
  ],

  declarations: [RegisterComponent],
  exports: [RegisterComponent],
})
export class RegisterModule { }
