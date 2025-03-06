import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

export const SYSTEM_ROUTES: Routes = [
    {
        path: 'profile',
        canActivate: [AuthGuard],
        loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent)
    },
];
