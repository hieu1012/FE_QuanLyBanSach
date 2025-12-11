import { Injectable } from '@angular/core';
import { BaseHttpService } from './base.service';
import { Observable } from 'rxjs';

// DTO cho body tạo/cập nhật user
export interface UserPayload {
  username: string;
  email: string;
  password?: string; // Có thể optional khi update
  fullName: string;
  phoneNumber: string;
  address: string;
  role: string; // ví dụ: "MASTER"
  isActive?: boolean; // Nếu backend cho phép truyền
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService {
  getUsersPage(
    page: number = 0,
    size: number = 20,
    sort: string[] = [],
    keyword?: string,
    role?: string,
    isActive?: boolean
  ): Observable<any> {
    const params: any = { page, size };
    if (sort && sort.length) params.sort = sort;
    if (keyword) params.keyword = keyword;
    if (role) params.role = role;
    if (isActive !== undefined) params.isActive = isActive;
    return this.get('users/page', params);
  }

  /**
   * Thêm mới user
   */
  addUser(payload: UserPayload): Observable<any> {
    return this.post<any>('users', payload);
  }

  /**
   * Cập nhật user
   */
  updateUser(id: number, payload: UserPayload): Observable<any> {
    return this.put<any>(`users/${id}`, payload);
  }

  /**
   * Xóa user
   */
  deleteUser(id: number): Observable<any> {
    return this.delete<any>(`users/${id}`);
  }

  changePassword(id: number, newPassword: string, confirmPassword: string ): Observable<any> {
    const payload = { newPassword : newPassword, confirmPassword: confirmPassword };
    return this.put<any>(`users/${id}/admin-change-password`, { ...payload });
  }
}
