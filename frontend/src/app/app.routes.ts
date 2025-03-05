import { ExtraOptions, Routes } from '@angular/router';

import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                loadChildren: () => import('../app/presentation/pages/home/routing.routes').then(c => c.HOME_ROUTES)
            },
            {
                path: 'contact',
                loadChildren: () => import('../app/presentation/pages/contact/contact.routes').then(c => c.CONTACT_ROUTES)
            }
        ]
    },
    {
        path: 'auth',
        loadChildren: () => import('../app/presentation/pages/auth/auth.routes').then((c) => c.AUTH_ROUTES)
    },
    {
        path: 'notfound',
        loadComponent: () => import('./demo/components/notfound/notfound.component').then((c) => c.NotfoundComponent)
    },
    {
        path: '**',
        redirectTo: '/notfound'
    },
];

export const routerConfig: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
};