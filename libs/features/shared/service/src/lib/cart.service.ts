// import { Injectable } from '@angular/core';
// import { BaseHttpService } from './base.service';
// import { Observable } from 'rxjs';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class CartService extends BaseHttpService {
//
//   // Lấy giỏ hàng của user
//   getCart(): Observable<any> {
//     return this.get<any>('cart');
//   }
//
//   // Thêm sản phẩm vào giỏ
//   addItemToCart(item: number, quantity: number): Observable<any> {
//     return this.post<any>('cart/add', {productId: item, quantity: quantity});
//   }
//
//   // Cập nhật sản phẩm trong giỏ (quantity)
//   updateItemInCart(item: { productId: number; quantity: number }): Observable<any> {
//     return this.put<any>('cart/update', item);
//   }
//
//   // Xoá sản phẩm khỏi giỏ
//   removeItemFromCart(id: number): Observable<any> {
//     return this.delete<any>(`cart/remove/${id}`);
//   }
//
//   // Tiến hành thanh toán (checkout)
//   checkout(data: {
//     orderAddress: {
//       firstName: string;
//       lastName: string;
//       address: string;
//       city: string;
//       state: string;
//       pincode: string;
//       mobileNo: string;
//       email: string;
//     },
//     paymentType: string
//   }): Observable<any> {
//     return this.post<any>('cart/checkout', data);
//   }
//
// }


import { Injectable } from '@angular/core';
import { BaseHttpService } from './base.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseHttpService {
  // Subjects để quản lý số lượng và danh sách sản phẩm
  private cartQuantitySubject = new BehaviorSubject<number>(0);
  cartQuantity$ = this.cartQuantitySubject.asObservable();

  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  // Lấy giỏ hàng của user
  getCart(): Observable<any> {
    // Tự động cập nhật subject mỗi khi gọi API getCart
    return this.get<any>('cart').pipe(
      tap(response => {
        const items = response.data?.items || [];
        this.cartItemsSubject.next(items);
        this.cartQuantitySubject.next( response.data.items.length);
      })
    );
  }

  // Thêm sản phẩm vào giỏ (kèm cập nhật Observable)
  addItemToCart(productId: number, quantity: number): Observable<any> {
    return this.post<any>('cart/add', { productId, quantity })
      .pipe(
        tap(() => this.refreshCart())
      );
  }

  // Cập nhật sản phẩm trong giỏ (quantity)
  updateItemInCart(item: { productId: number; quantity: number }): Observable<any> {
    return this.put<any>('cart/update', item)
      .pipe(
        tap(() => this.refreshCart())
      );
  }

  // Xoá sản phẩm khỏi giỏ
  removeItemFromCart(id: number): Observable<any> {
    return this.delete<any>(`cart/remove/${id}`)
      .pipe(
        tap(() => this.refreshCart())
      );
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
    return this.post<any>('cart/checkout', data)
      .pipe(
        tap(() => this.refreshCart())
      );
  }

  // Hàm gọi API getCart để cập nhật Observable, dùng sau mỗi thao tác
  refreshCart() {
    this.getCart().subscribe();
  }
}
