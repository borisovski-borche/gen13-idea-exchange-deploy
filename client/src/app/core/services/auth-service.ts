import { inject, Injectable, signal } from '@angular/core';
import { RegisterReq, User } from '../../feature/auth/auth-model';
import { Router } from '@angular/router';
import { NotificationsService } from './notifications-service';
import { AuthApiService } from './auth-api-service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private notificationsService = inject(NotificationsService);
  private apiService = inject(AuthApiService);
  private router = inject(Router);

  currentUser = signal<User | null>(this.getUserFromLocalStorage());

  loginUser(email: string, password: string) {
    this.apiService.loginUser(email, password).subscribe({
      next: (value) => {
        this.currentUser.set(value);
        this.router.navigate(['posts']);
        this.saveUserInLocalStorage(this.currentUser());
      },
      error: (err) => {
        this.notificationsService.showError(err.error?.message);
      },
    });
  }

  registerUser(req: RegisterReq) {
    this.apiService.registerUser(req).subscribe({
      next: () => {
        console.log('this is the success callback');
        this.notificationsService.showSuccess('User registered successfully!');
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.log('this is the error callback');
        console.log(err);
        this.notificationsService.showError(err.error?.message);
      },
      complete: () => {
        console.log('the observable has been completed');
      },
    });
  }

  logoutFromClient() {
    this.currentUser.set(null);
    this.router.navigate(['']);
    // localStorage.clear();
    localStorage.removeItem('currentUser');
  }

  logoutFromServer() {
    this.apiService.logoutUserFromServer(this.currentUser().refreshToken).subscribe();
  }

  refreshAccessToken(refreshToken: string) {
    return this.apiService.refreshAccessToken(refreshToken).pipe(
      tap((res) => {
        this.currentUser.update((prevUser) => ({
          ...prevUser,
          token: res.token,
          refreshToken: res.refreshToken,
        }));
        this.saveUserInLocalStorage(this.currentUser());
      }),
    );
  }

  saveUserInLocalStorage(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUserFromLocalStorage(): User | null {
    const stringUserData = localStorage.getItem('currentUser');
    return stringUserData ? JSON.parse(stringUserData) : null;
  }
}
