// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { NzButtonModule } from 'ng-zorro-antd/button';
// import { NzMenuModule } from 'ng-zorro-antd/menu';
// import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
// import { NzIconModule } from 'ng-zorro-antd/icon';
// import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';


// @NgModule({
//   imports: [CommonModule, NzDropDownModule, NzButtonModule, NzIconModule, NzMenuModule, NzOverlayModule],
//   exports: [NzDropDownModule, NzButtonModule, NzIconModule, NzMenuModule, NzOverlayModule],
// })
// export class SharedUiModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

import { appIcons } from './icons';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    NzDropDownModule,
    NzButtonModule,
    NzIconModule,
    NzMenuModule,
    NzOverlayModule,
    ReactiveFormsModule,
    NzModalModule,
    NzResultModule
  ],
  exports: [
    NzDropDownModule,
    NzButtonModule,
    NzIconModule,
    NzMenuModule,
    NzOverlayModule,
    ReactiveFormsModule,
    NzModalModule,
    NzResultModule
  ],
  providers: [
    { provide: NZ_ICONS, useValue: appIcons }
  ]
})
export class SharedUiModule { }
