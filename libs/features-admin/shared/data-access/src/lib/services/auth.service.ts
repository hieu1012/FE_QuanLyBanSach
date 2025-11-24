// services/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseHttpService } from './base.service'; // Corrected path
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    refreshToken?: string;
    expiresIn?: number;
    user?: any;
    // backend có thể trả thêm: fullName, roles, permissions...
}

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseHttpService {
    private router = inject(Router);
    
    override prefix = 'auth';

    // Login – chỉ 1 dòng gọi API, đẹp như mơ
    login(username: string, password: string): Observable<any> {
        const body: LoginRequest = { username, password };

        return this.post<any>('login', body).pipe(
            // tap(response => {
            //     if (response?.token) {
            //         localStorage.setItem('access_token', response.token);
            //         if (response.refreshToken) {
            //             localStorage.setItem('refresh_token', response.refreshToken);
            //         }
            //         // Có thể lưu thêm user info nếu cần
            //         if (response.user) {
            //             localStorage.setItem('current_user', JSON.stringify(response.user));
            //         }
            //     }
            // })
        );
    }

    // Các hàm tiện ích
    logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('current_user');
        this.router.navigate(['/login']); // Redirect to login
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

}