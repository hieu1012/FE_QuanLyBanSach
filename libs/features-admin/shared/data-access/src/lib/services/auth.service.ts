// services/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseHttpService } from './base.service'; // Corrected path
import { Observable, tap, map } from 'rxjs';


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

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseHttpService {
    private router = inject(Router);

    override prefix = 'auth';

    // Login – chỉ 1 dòng gọi API, đẹp như mơ
    // Giả sử bạn muốn lưu accessToken, refreshToken và user vào localStorage sau khi đăng nhập thành công.

    // Sau khi gọi API đăng nhập và nhận được response như bạn đưa ra, hãy lưu các thông tin cần thiết như sau:
    login(username: string, password: string): Observable<any> {
        const body: LoginRequest = { username, password };

        return this.post<any>('login', body).pipe(
            map(res => res.data),
            tap(response => {
                console.log('Login response:', response);
                if (response?.accessToken) {
                    localStorage.setItem('access_token', response.accessToken);
                }
                if (response?.refreshToken) {
                    localStorage.setItem('refresh_token', response.refreshToken);
                }
                if (response?.user) {
                    localStorage.setItem('current_user', JSON.stringify(response.user));
                }
            })
        );
    }

    // Các hàm tiện ích
    logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('current_user');
        this.router.navigate(['/dang-nhap']); // Redirect to login
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    getCurrentUser(): any {
        const user = localStorage.getItem('current_user');
        return user ? JSON.parse(user) : null;
    }

}
