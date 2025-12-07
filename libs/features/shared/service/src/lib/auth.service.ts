import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseHttpService } from './base.service';
import { Observable, tap, map, BehaviorSubject } from 'rxjs';

export enum UserRole {
  MASTER = 'MASTER',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  user: AuthUser;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  expiresIn?: number;
  user?: any;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phoneNumber: string;
  address: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: any; // Nếu trả về user sau khi đăng ký
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService {
  private router = inject(Router);

  override prefix = 'auth';

  // ==== BehaviorSubject state quản lý global ====
  private loggedInSubject = new BehaviorSubject<boolean>(!!this.getToken());
  loggedIn$ = this.loggedInSubject.asObservable();

  private userSubject = new BehaviorSubject<AuthUser | null>(this.getCurrentUser());
  user$ = this.userSubject.asObservable();

  // ==== LOGIN ====
  login(username: string, password: string): Observable<any> {
    const body: LoginRequest = { username, password };
    return this.post<any>('login', body).pipe(
      map(res => res.data), // chỉnh theo đúng backend trả
      tap(response => {
        // response phải có field đúng với backend, ví dụ: response.accessToken
        if (response?.accessToken) {
          localStorage.setItem('access_token', response.accessToken);
        }
        if (response?.refreshToken) {
          localStorage.setItem('refresh_token', response.refreshToken);
        }
        if (response?.user) {
          localStorage.setItem('current_user', JSON.stringify(response.user));
        }
        this.loggedInSubject.next(true); // UPDATE trạng thái
        this.userSubject.next(response?.user || null);
      })
    );
  }

  // ==== LOGOUT ====
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');
    this.loggedInSubject.next(false); // UPDATE trạng thái
    this.userSubject.next(null);
    this.router.navigate(['/dang-nhap']);
  }

  // ==== Getter tiện ích ====
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getCurrentUser(): AuthUser | null {
    const user = localStorage.getItem('current_user');
    return user ? JSON.parse(user) : null;
  }

  // ==== Có thể bổ sung làm mới user nếu cần ====
  refreshUser() {
    const user = this.getCurrentUser();
    this.userSubject.next(user);
    this.loggedInSubject.next(!!this.getToken());
  }

  register(data: any): Observable<any> {
    return this.post<any>('register', data);
  }
}
