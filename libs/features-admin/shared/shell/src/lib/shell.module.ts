import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { en_US, NZ_DATE_LOCALE, NZ_I18N, NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { enUS, vi } from 'date-fns/locale';
import en from '@angular/common/locales/en';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ColumnResizingService } from '@progress/kendo-angular-grid';
import { appRoutes } from './shell.route';
registerLocaleData(en);

const PROVIDERS = [
  {
    provide: NZ_I18N,
    useValue: en_US,
  },
  {
    provide: NZ_DATE_LOCALE,
    useValue: enUS,
  },
];
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NzModalModule,
    RouterModule.forRoot(appRoutes, {
          initialNavigation: 'enabledBlocking',
          scrollPositionRestoration: 'top',
        }),
  ],
  exports: [HttpClientModule, RouterModule],
  providers: [...PROVIDERS, ColumnResizingService],
})
export class ShellModule {
  constructor(@Optional() @SkipSelf() parentModule: ShellModule, private i18n: NzI18nService) {
    this.i18n.setLocale(vi_VN);
    this.i18n.setDateLocale(vi);
    if (parentModule) {
      throw new Error('ShellModule is already loaded. Import it in the AppModule only');
    }
  }
}
