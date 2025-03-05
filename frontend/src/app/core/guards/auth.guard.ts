import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import {
  Injectable,
  inject
} from '@angular/core';

import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
class Permission {
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);

  constructor() { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this._authService.isAuthenticated()) {
      this._router.navigate(['/auth/login'], { replaceUrl: true });
      return false;
    }

    return true;
  }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean => {
  return inject(Permission).canActivate(next, state);
}
