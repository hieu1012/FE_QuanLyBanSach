import { Routes } from '@angular/router';


export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'trang-chu',
        pathMatch: 'full',
    },
    {
        path: 'trang-chu',
        loadChildren: () =>
            import('@emi/features/home').then(m => m.HomeModule),
    },
    {
        path: 'dang-ky',
        loadChildren: () =>
            import('@emi/features/register').then(m => m.RegisterModule),
    },
    {
        path: 'tra-cuu',
        loadChildren: () =>
            import('@emi/features/lookup').then(m => m.LookupModule),
    }

];
