import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

export const AUTH_ROUTES: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent)
    },
    {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent),
        canActivate: [AuthGuard]
    },
];
