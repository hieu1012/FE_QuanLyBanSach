import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupComponent } from './lookup.component';
import { LichThiComponent } from './lich-thi/lich-thi.component';

import { LookupRoutes } from './lookup.routes';
import { RouterModule } from '@angular/router';
import { LePhiThiComponent } from './le-phi-thi/le-phi-thi.component';
import { KetQuaThiComponent } from './ket-qua-thi/ket-qua-thi.component';
import { DeThiMauComponent } from './de-thi-mau/de-thi-mau.component';

import { GridModule } from '@progress/kendo-angular-grid'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LookupRoutes),
    GridModule

  ],
  declarations: [
    LookupComponent,
    LichThiComponent,
    LePhiThiComponent,
    KetQuaThiComponent,
    DeThiMauComponent,
  ],
  exports: [LookupComponent],
})
export class LookupModule { }
