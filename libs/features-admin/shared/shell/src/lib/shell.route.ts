import { Routes } from '@angular/router';


export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dang-nhap',
        pathMatch: 'full',
    },
    {
        path: 'dang-nhap',
        loadChildren: () =>
            import('@emi/features-admin/login').then(m => m.LoginModule),
    },
];
