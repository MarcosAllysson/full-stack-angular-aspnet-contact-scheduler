import { Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {
  inject,
  Injectable
} from '@angular/core';

import { ContactRegister } from '../interfaces/ContactRegister';
import { ContactResponse } from '../interfaces/ContactResponse';
import { ContactUpdate } from '../interfaces/ContactUpdate';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly _http = inject(HttpClient);

  private readonly _apiUrl = `${environment.apiUrl}/ContactScheduler`;

  constructor() { }

  public getContacts(): Observable<ContactResponse[]> {
    return this._http
      .get<ContactResponse[]>(`${this._apiUrl}`)
      .pipe(take(1));
  }

  public searchContacts(query: string): Observable<ContactResponse[]> {
    return this._http
      .get<ContactResponse[]>(`${this._apiUrl}/search?query=${query}`)
      .pipe(take(1));
  }

  public getFavorites(): Observable<ContactResponse[]> {
    return this._http
      .get<ContactResponse[]>(`${this._apiUrl}/favorites`)
      .pipe(take(1));
  }

  public getDisabledContacts(): Observable<ContactResponse[]> {
    return this._http
      .get<ContactResponse[]>(`${this._apiUrl}/disabled-contacts`, {})
      .pipe(take(1));
  }

  public getContact(id: number): Observable<ContactResponse> {
    return this._http
      .get<ContactResponse>(`${this._apiUrl}/${id}`)
      .pipe(take(1));
  }

  public createContact(contact: ContactRegister): Observable<ContactResponse> {
    return this._http
      .post<ContactResponse>(`${this._apiUrl}`, contact)
      .pipe(take(1));
  }

  public updateContact(id: number, contact: ContactUpdate): Observable<void> {
    return this._http
      .put<void>(`${this._apiUrl}/${id}`, contact)
      .pipe(take(1));
  }

  public deactivateContact(id: number): Observable<void> {
    return this._http
      .patch<void>(`${this._apiUrl}/${id}/deactivate`, {})
      .pipe(take(1));
  }

  public activateContact(id: number): Observable<void> {
    return this._http
      .patch<void>(`${this._apiUrl}/${id}/activate`, {})
      .pipe(take(1));
  }

  public toggleFavorite(id: number): Observable<void> {
    return this._http
      .patch<void>(`${this._apiUrl}/${id}/toggle-favorite`, {})
      .pipe(take(1));
  }

  public checkCellPhoneNumberExists(phoneNumber: string): Observable<boolean> {
    return this._http
      .get<boolean>(`${this._apiUrl}/${phoneNumber}/check-cellphone`)
      .pipe(take(1));
  }
}
