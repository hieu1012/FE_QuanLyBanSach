import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LienHeComponent } from './lien-he.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LienHeComponent,
      },
    ]),

  ],
  declarations: [LienHeComponent],
})
export class FeaturesLienHeModule {}
