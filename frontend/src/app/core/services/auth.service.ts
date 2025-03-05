import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from 'src/environments/environment.dev';
import { IAuthResponse } from 'src/app/presentation/pages/auth/interfaces/IAuthResponse';
import { ILogin } from 'src/app/presentation/pages/auth/interfaces/ILogin';
import { IRegister } from 'src/app/presentation/pages/auth/interfaces/IRegister';
import { IUserProfile } from 'src/app/presentation/pages/auth/interfaces/IUserProfile';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _router = inject(Router);
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = `${environment.apiUrl}/Account`;

  constructor() { }

  public login(credentials: ILogin): Observable<IAuthResponse> {
    return this._http.post<IAuthResponse>(`${this._apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  public register(userData: IRegister): Observable<IAuthResponse> {
    return this._http.post<IAuthResponse>(`${this._apiUrl}/register`, userData).pipe(
      tap(response => {
        if (response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  public forgotPassword(email: string): Observable<any> {
    return this._http.post(`${this._apiUrl}/forgot-password`, { email });
  }

  public getProfile(): Observable<IUserProfile> {
    return this._http.get<IUserProfile>(`${this._apiUrl}/profile`);
  }

  public logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/auth/login']);
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
