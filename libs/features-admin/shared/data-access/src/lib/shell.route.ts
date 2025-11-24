import { Route } from '@angular/router';
import { LayoutComponent } from '@teknet/web-emi-group/ui';

export const webAppRoutes: Route[] = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'trang-chu',
            },
            {
                path: 'trang-chu',
                loadChildren: async () =>(await import('@teknet/web-emi-group/home')).HomeModule,
            },
        ],
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '**',
                pathMatch: 'full',
                loadChildren: async () => (await import('@asc/web/notfound')).WebNotfoundModule,
            },
        ],
    },
];
