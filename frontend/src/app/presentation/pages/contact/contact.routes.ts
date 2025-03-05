import { Routes } from '@angular/router';

export const CONTACT_ROUTES: Routes = [
    {
        path: 'listing',
        loadComponent: () => import('./listing/listing.component').then(c => c.ListingComponent)
    },
    {
        path: 'favorites',
        loadComponent: () => import('./favorites/favorites.component').then(c => c.FavoritesComponent)
    },
    {
        path: 'disabled',
        loadComponent: () => import('./disabled/disabled.component').then(c => c.DisabledComponent)
    },
];
