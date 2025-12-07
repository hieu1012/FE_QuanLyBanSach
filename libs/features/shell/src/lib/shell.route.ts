import { Routes } from '@angular/router';


export const appRoutes: Routes = [
  {
    path      : '',
    redirectTo: 'trang-chu',
    pathMatch : 'full',
  },
  {
    path        : 'trang-chu',
    loadChildren: () =>
      import('@emi/features/home').then(m => m.HomeModule),
  },
  {
    path        : 'dang-ky',
    loadChildren: () =>
      import('@emi/features/register').then(m => m.RegisterModule),
  },
  {
    path        : 'dang-nhap',
    loadChildren: () =>
      import('@emi/features/login').then(m => m.FeaturesLoginModule),
  },
  {
    path        : 'lien-he',
    loadChildren: () =>
      import('@emi/features/lien-he').then(m => m.FeaturesLienHeModule),
  },
  {
    path        : 'khuyen-mai',
    loadChildren: () =>
      import('@emi/features/khuyen-mai').then(m => m.FeaturesKhuyenMaiModule),
  },
  {
    path        : 'gioi-thieu',
    loadChildren: () =>
      import('@emi/features/gioi-thieu').then(m => m.FeaturesGioiThieuModule),
  },
];
