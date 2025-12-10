import { Injectable } from '@angular/core';
import { BaseHttpService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService extends BaseHttpService {

  private readonly API_PREFIX = 'admin/orders';

  // 1. Lấy danh sách đơn hàng (có hỗ trợ filter, phân trang, sort)
  // AdminOrderService.ts
  getOrders(params: {
    keyword?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
    sort?: string | string[];
  } = {}): Observable<any> {

    // Tạo object sạch
    const cleanParams: any = {
      page: params.page ?? 0,
      size: params.size ?? 20,
    };

    if (params.keyword?.trim()) cleanParams.keyword = params.keyword.trim();
    if (params.status) cleanParams.status = params.status;
    if (params.startDate) cleanParams.startDate = params.startDate;
    if (params.endDate) cleanParams.endDate = params.endDate;
    if (params.sort) {
      cleanParams.sort = Array.isArray(params.sort) ? params.sort : params.sort;
    }

    console.log('getOrders() - Params cuối cùng:', cleanParams);

    // TRUYỀN THẲNG OBJECT, KHÔNG bọc { params: ... }
    return this.get<any>(this.API_PREFIX, cleanParams);
  }

  // 2. Lấy chi tiết một đơn hàng theo ID
  getOrderById(id: number): Observable<any> {
    return this.get<any>(`${this.API_PREFIX}/${id}`);
  }

  // 3. Cập nhật toàn bộ thông tin đơn hàng (PUT /admin/orders/{id})
  updateOrder(id: number, payload: any): Observable<any> {
    return this.put<any>(`${this.API_PREFIX}/${id}`, payload);
  }

  // 4. Xóa đơn hàng (DELETE /admin/orders/{id})
  deleteOrder(id: number): Observable<any> {
    return this.delete<any>(`${this.API_PREFIX}/${id}`);
  }

  // 5. Cập nhật trạng thái đơn hàng (PUT /admin/orders/{id}/status)
  updateOrderStatus(
    id: number,
    status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCEL_REQUESTED' | 'CANCELLED'
  ): Observable<any> {
    return this.put<any>(`${this.API_PREFIX}/${id}/status`, { status });
  }

  // Bonus: Nếu backend có thêm endpoint hủy đơn từ admin (thường khác với user cancel)
  // cancelOrderByAdmin(id: number): Observable<any> {
  //   return this.post<any>(`${this.API_PREFIX}/${id}/cancel`, {});
  // }
}
