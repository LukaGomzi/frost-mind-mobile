import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { logout, refreshAccessToken } from "../state/auth.store";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private routesToExclude: string[] = ['/auth/login', '/user/register'];

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.routesToExclude.some(route => request.url.includes(route))) {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        request = this.addToken(request, accessToken);
      }
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return from(refreshAccessToken()).pipe(
            switchMap(() => {
              const newAccessToken = localStorage.getItem('access_token');
              return next.handle(this.addToken(request, newAccessToken));
            }),
            catchError((refreshError) => {
              console.error('Token refresh failed', refreshError);
              logout();
              this.router.navigateByUrl('/login');
              return throwError(refreshError);
            })
          );
        }
        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
