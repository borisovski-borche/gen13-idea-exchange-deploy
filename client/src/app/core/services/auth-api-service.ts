import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RefreshTokenRes, RegisterReq, User } from '../../feature/auth/auth-model';
import { API_URL } from '../core-constants';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);

  registerUser(reqBody: RegisterReq) {
    return this.http.post(`${API_URL}/auth/register`, reqBody);
  }

  loginUser(email: string, password: string) {
    return this.http.post<User>(`${API_URL}/auth/login`, { email, password });
  }

  logoutUserFromServer(refreshToken: string) {
    return this.http.post(`${API_URL}/auth/logout`, { refreshToken });
  }

  refreshAccessToken(refreshToken: string) {
    return this.http.post<RefreshTokenRes>(`${API_URL}/auth/refresh-token`, { refreshToken });
  }
}
