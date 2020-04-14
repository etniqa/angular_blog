import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FirebaseAuthResponse, User} from '../../../shared/interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'  // need to provide in root. Just need
})
export class AuthService {
  // this error$ is in login-page for display error$
  public error$: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    // if token is inactive already
    if (new Date() > expDate) {
      this.logout();
      return null;
    } else {
      return localStorage.getItem('fb-token');
    }
  }

  login(user: User): Observable<any> {
    // for being expiresIn in response of server (for uninfinity using of token)
    user.returnSecureToken = true;
    // here I try to login into firebase, where admins are registrated
    return this.httpClient.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        // tap === perform method after getting response
        // set token from property in response
        tap(this.setToken),
        // handle errors if the will be (THIS FUNCTION IS IN THIS COMPONENT)
        catchError(this.handleError // dont know for what bind(this) but it`s needed
          .bind(this))
      );
  }

  logout() {
    // imitate null response (reject) from server
    this.setToken(null);
  }

  private setToken(response: FirebaseAuthResponse | null) {
    if (response) {
      // save token with extends expired date
      const expiredDate = new Date(new Date().getTime() + +response.expiresIn + 1000000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expiredDate.toString());
    } else {
      localStorage.clear();
    }
  }

  private handleError(error: HttpErrorResponse) {
    // {messageFromGuard: messageFromGuard} ???
    const {message} = error.error.error;
    switch (message) {
      case 'INVALID_EMAIL':
        // error$ emit some strings, which will show in login-page.component.ts
        this.error$.next('Wrong email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Wrong password');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('email not found');
        break;

    }

    return throwError(error);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
