import { Injectable } from '@angular/core';
import { BaseHttpService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseHttpService {

  // Lấy tất cả đơn hàng
  getOrders(): Observable<any> {
    return this.get<any>('orders');
  }

  // Tạo mới đơn hàng
  createOrder(payload: {
    status: string,
    paymentType: string,
    totalPrice: number,
    user: { id: number },
    orderAddress: {
      firstName: string,
      lastName: string,
      address: string,
      city: string,
      state: string,
      pincode: string,
      mobileNo: string,
      email: string
    },
    items: {
      product: { id: number },
      quantity: number
    }[]
  }): Observable<any> {
    return this.post<any>('orders', payload);
  }

  // Lấy chi tiết đơn hàng theo id
  getOrderById(id: number): Observable<any> {
    return this.get<any>(`orders/${id}`);
  }

  // Hủy đơn hàng theo id
  cancelOrder(id: number): Observable<any> {
    return this.post<any>(`orders/${id}/cancel`, {});
  }
}
