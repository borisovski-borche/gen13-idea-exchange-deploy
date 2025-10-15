import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { SpinnerService } from './services/spinner-service';
import { inject } from '@angular/core';
import { catchError, EMPTY, finalize, switchMap } from 'rxjs';
import { AuthService } from './services/auth-service';
import { NotificationsService } from './services/notifications-service';

export const spinnerInterceptor: HttpInterceptorFn = (request, next) => {
  const spinnerService = inject(SpinnerService);

  spinnerService.showSpinner();

  return next(request).pipe(finalize(() => spinnerService.hideSpinner()));
};

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const notificationsService = inject(NotificationsService);

  if (
    request.url.includes('login') ||
    request.url.includes('register') ||
    request.url.includes('refresh-token')
  )
    return next(request);

  if (!authService.currentUser()) return next(request);

  const clone = request.clone({
    headers: request.headers.set('Authorization', `Bearer ${authService.currentUser().token}`),
  });

  return next(clone).pipe(
    catchError((err: HttpErrorResponse) => {
      console.log('this is the err', err);

      if (err.status === 403) {
        //Here we try to refresh acess token
        return authService.refreshAccessToken(authService.currentUser().refreshToken).pipe(
          //in case the refresh token endpoint returns error
          catchError(() => {
            notificationsService.showError('Session expired, please log in to continue!');
            authService.logoutFromClient();

            return EMPTY;
          }),
          //in case the refresh token is successful
          switchMap((res) => {
            const newClone = request.clone({
              headers: request.headers.set('Authorization', `Bearer ${res.token}`),
            });

            return next(newClone);
          }),
        );
      }

      return next(clone);
    }),
  );
};
