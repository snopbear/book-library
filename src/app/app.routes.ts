import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./book-list/book-list.component').then((m) => m.BookListComponent),
  },
  {
    path: 'details',
    loadComponent: () =>
      import('./book-details/book-details.component').then(
        (m) => m.BookDetailsComponent
      ),
  },
];
