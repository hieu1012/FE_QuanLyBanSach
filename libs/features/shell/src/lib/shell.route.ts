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
  {
    path        : 'san-pham',
    loadChildren: () =>
      import('@emi/features/chi-tiet-san-pham').then(m => m.FeaturesChiTietSanPhamModule),
  },
  {
    path        : 'gio-hang',
    loadChildren: () =>
      import('@emi/features/gio-hang').then(m => m.FeaturesGioHangModule),
  },
  {
    path        : 'don-hang',
    loadChildren: () =>
      import('@emi/features/don-hang').then(m => m.FeaturesDonHangModule),
  },
  {
    path        : 'danh-muc-sach',
    loadChildren: () =>
      import('@emi/features/danh-muc').then(m => m.FeaturesDanhMucModule),
  },
];
