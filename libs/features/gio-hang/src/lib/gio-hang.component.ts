// import { Component, OnInit } from '@angular/core';
// import { ProductService, CartService } from '@emi/features/shared/service';
//
// @Component({
//   selector   : 'emi-gio-hang',
//   templateUrl: './gio-hang.component.html',
//   styleUrls  : ['./gio-hang.component.scss'],
// })
// export class GioHangComponent implements OnInit {
//   cart: any = {
//     'id'         : 2,
//     'userId'     : 4,
//     'items'      : [
//       {
//         'id'       : 4,
//         'product'  : {
//           'id'           : 10,
//           'title'        : 'Chiến Lược Marketing Hiệu Quả',
//           'description'  : 'Các kỹ thuật marketing hiện đại',
//           'price'        : 165000,
//           'discountPrice': 132000,
//           'discount'     : 20,
//           'stock'        : 55,
//           'imageUrls'    : [
//             'https://res.cloudinary.com/dcedtiyrf/image/upload/q_auto,f_auto/v1/quanlybansach/products/sample-marketing-book.jpg'
//           ],
//           'categoryName' : 'Sách Kinh Tế'
//         },
//         'quantity' : 1,
//         'unitPrice': 132000
//       }
//     ],
//     'totalAmount': 132000
//   };
//
//   constructor(
//     private bookService: ProductService,
//     private cartService: CartService,
//   ) {}
//
//   ngOnInit(): void {
//     this.loadCart();
//   }
//
//   loadCart() {
//     this.cartService.getCart().subscribe({
//       next: (response) => {
//         this.cart = response.data;
//       },
//       error: (err) => {
//         console.error('Lỗi khi tải giỏ hàng', err);
//       }
//     });
//   }
//
//   // Cập nhật số lượng
//   updateQuantity(index: number, newQuantity: number) {
//     if (newQuantity < 1 || newQuantity > this.cart.items[index].product.stock) return;
//     this.cart.items[index].quantity = newQuantity;
//
//     // Cập nhật lại tổng tiền
//     this.cart.totalAmount = this.cart.items.reduce((total: number, item: any) => {
//       return total + (item.unitPrice * item.quantity);
//     }, 0);
//   }
//
//   // Xóa sản phẩm
//   removeFromCart(index: number) {
//     this.cartService.removeItemFromCart(index).subscribe({
//       next: (response) => {
//         this.loadCart();
//       },
//       error: (err) => {
//         console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng', err);
//       }
//     });
//   }
//
//   // Tính tạm tính
//   calculateSubTotal(): number {
//     return this.cart.items.reduce((total: number, item: any) => {
//       return total + (item.unitPrice * item.quantity);
//     }, 0);
//   }
// }
//

import { Component, OnInit } from '@angular/core';
import { ProductService, CartService } from '@emi/features/shared/service';

@Component({
  selector: 'emi-gio-hang',
  templateUrl: './gio-hang.component.html',
  styleUrls: ['./gio-hang.component.scss'],
})
export class GioHangComponent implements OnInit {
  cart: any = null; // Xóa hardcode, dùng API

  // Dữ liệu order từ form
  orderData = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    mobileNo: '',
    email: '',
    paymentType: 'COD',
    totalPrice: 0, // Tự động tính từ cart
    user: { id: 4 }, // Giả sử userId từ auth
    items: [] // Tự động map từ cart.items
  };

  constructor(
    private bookService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (response) => {
        this.cart = response.data;
        this.updateOrderItems(); // Đồng bộ items cho order
      },
      error: (err) => {
        console.error('Lỗi khi tải giỏ hàng', err);
      }
    });
  }

  // Đồng bộ items từ cart sang orderData
  updateOrderItems() {
    this.orderData.items = this.cart.items.map((item: any) => ({
      product: { id: item.product.id },
      quantity: item.quantity
    }));
    this.orderData.totalPrice = this.cart.totalAmount;
  }

  // Cập nhật số lượng + đồng bộ order
  updateQuantity(index: number, newQuantity: number) {
    if (newQuantity < 1 || newQuantity > this.cart.items[index].product.stock) return;
    this.cart.items[index].quantity = newQuantity;
    this.cart.totalAmount = this.cart.items.reduce((total: number, item: any) => {
      return total + (item.unitPrice * item.quantity);
    }, 0);
    this.updateOrderItems(); // Đồng bộ lại
  }

  // Xóa sản phẩm + reload cart
  removeFromCart(productId: number) {
    this.cartService.removeItemFromCart(productId).subscribe({ // Giả sử API nhận productId
      next: () => this.loadCart(),
      error: (err) => console.error('Lỗi xóa', err)
    });
  }

  // Tạo order
  createOrder() {
    // this.updateOrderItems(); // Đảm bảo đồng bộ trước khi gửi
    // this.cartService.createOrder(this.orderData).subscribe({
    //   next: (response) => {
    //     console.log('Order tạo thành công:', response);
    //     // Redirect đến trang xác nhận hoặc thanh toán
    //     // this.router.navigate(['/order-success', response.id]);
    //   },
    //   error: (err) => {
    //     console.error('Lỗi tạo order', err);
    //     // Hiển thị toast lỗi
    //   }
    // });
  }

  calculateSubTotal(): number {
    return this.cart?.totalAmount || 0;
  }
}
