import { Injectable } from '@angular/core';
import { BaseHttpService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseHttpService {

  // Lấy giỏ hàng của user
  getCart(): Observable<any> {
    return this.get<any>('cart');
  }

  // Thêm sản phẩm vào giỏ
  addItemToCart(item: number, quantity: number): Observable<any> {
    return this.post<any>('cart/add', {productId: item, quantity: quantity});
  }

  // Cập nhật sản phẩm trong giỏ (quantity)
  updateItemInCart(item: { productId: number; quantity: number }): Observable<any> {
    return this.put<any>('cart/update', item);
  }

  // Xoá sản phẩm khỏi giỏ
  removeItemFromCart(id: number): Observable<any> {
    return this.delete<any>(`cart/remove/${id}`);
  }

  // Tiến hành thanh toán (checkout)
  checkout(data: {
    orderAddress: {
      firstName: string;
      lastName: string;
      address: string;
      city: string;
      state: string;
      pincode: string;
      mobileNo: string;
      email: string;
    },
    paymentType: string
  }): Observable<any> {
    return this.post<any>('cart/checkout', data);
  }

}
