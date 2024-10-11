import { Routes } from '@angular/router';
import { ErrorComponent } from './modules/error/error.component';

export const routes: Routes = [
    {
        path: 'game',
        loadComponent: () => import('./modules/games/games.component').then(mod => mod.GamesComponent),
    },
    {
        path: '',
        redirectTo: 'game',
        pathMatch: 'prefix'
    },
    {
        path: '**',
        component: ErrorComponent
    }
];
