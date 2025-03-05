import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpInterceptorFn,
} from '@angular/common/http';

import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/auth/login']);
      }

      return throwError(() => error);
    })
  );
};
