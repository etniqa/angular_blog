import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../admin/shared/services/auth.service';
import {Route, Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
// HttpInterceptor - implement for all interceptors
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private router: Router
  ) {
  }

  // intercept all requests to server during entrance in system
  intercept(req: HttpRequest<any>,  // request
            next: HttpHandler)  // promise of server response
    : Observable<HttpEvent<any>> {
    // if I`m an admin and I`m in the system then I add token to authParams
    if (this.authService.isAuthenticated()) {
      // add to request token
      req = req.clone({
        setParams: {
          auth: this.authService.token
        }
      });
    }
    // next.handle(req) === send request
    return next.handle(req)
      .pipe(
        tap(() => {
          console.log('from interceptor', req);
        }),
        // if there was an error I add queryParams
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            console.log('interceptor error', err);
            this.authService.logout();  // to delete all local storage values
            this.router.navigate(['/admin', 'login'], {
              queryParams: {
                authFailed: true
              }
            });
          }
          return throwError(err);
        })
      );
  }

}
