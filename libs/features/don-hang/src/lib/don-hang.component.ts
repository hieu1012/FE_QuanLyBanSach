// import { Component, OnInit } from '@angular/core';
// import { CommonModule, DatePipe } from '@angular/common';
// import { OrderService } from '@emi/features/shared/service';
//
// @Component({
//   selector   : 'emi-don-hang',
//   templateUrl: './don-hang.component.html',
//   styleUrls  : ['./don-hang.component.scss'],
// })
// export class DonHangComponent implements OnInit {
//   orders: any[] = []; // Danh sách orders
//   expandedOrders: { [key: number]: boolean } = {}; // Track expand/collapse
//   orderDetail : any = null;
//   constructor(private orderService: OrderService) {
//   }
//
//   ngOnInit(): void {
//     this.loadOrders();
//   }
//
//   loadOrders() {
//     this.orderService.getOrders().subscribe({
//       next : (response) => {
//         console.log('Lấy đơn hàng thành công', response);
//         this.orders = response.data.content.map((order: any) => ({
//           ...order,
//           // orderDate: new Date(...order.orderDate),
//           // detail   : this.getOrderDetail(order.id)
//         }));
//       },
//       error: (err) => {
//         console.error('Lỗi tải đơn hàng', err);
//       }
//     });
//   }
//
//   // Toggle expand/collapse
//   toggleOrderDetail(orderId: number) {
//     console.log('Toggling order detail for orderId:', orderId);
//     this.expandedOrders[orderId] = !this.expandedOrders[orderId];
//     this.getOrderDetail(orderId);
//   }
//
//
//   getOrderDetail(orderId: number): void {
//     this.orderService.getOrderById(orderId).subscribe({
//       next : (response) => {
//         // console.log('Lấy chi tiết đơn hàng thành công', response);
//         this.orderDetail = response.data;
//         console.log('Chi tiết đơn hàng:', this.orderDetail);
//
//       },
//       error: (err) => {
//         console.error('Lỗi tải chi tiết đơn hàng', err);
//       }
//     });
//
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OrderService } from '@emi/features/shared/service';

@Component({
  selector: 'emi-don-hang',
  templateUrl: './don-hang.component.html',
  styleUrls: ['./don-hang.component.scss'],
})
export class DonHangComponent implements OnInit {
  orders: any[] = [];
  selectedOrder: any = null; // Chỉ lưu 1 đơn hàng đang mở chi tiết
  loadingDetail = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (response: any) => {
        this.orders = response.data.content.map((order: any) => ({
          ...order,
          orderDate: new Date(
            order.orderDate[0],
            order.orderDate[1] - 1, // JS tháng bắt đầu từ 0
            order.orderDate[2],
            order.orderDate[3],
            order.orderDate[4],
            order.orderDate[5]
          )
        }));
      },
      error: (err) => {
        console.error('Lỗi tải danh sách đơn hàng', err);
      }
    });
  }

  // Khi click vào 1 đơn hàng → lấy chi tiết
  toggleOrderDetail(orderId: number, order: any) {
    if (this.selectedOrder?.id === orderId) {
      this.selectedOrder = null; // Đóng nếu đang mở
    } else {
      this.loadingDetail = true;
      this.orderService.getOrderById(orderId).subscribe({
        next: (res: any) => {
          this.selectedOrder = res.data; // Dữ liệu đúng như bạn gửi
          this.loadingDetail = false;
        },
        error: (err) => {
          console.error('Lỗi lấy chi tiết đơn hàng', err);
          this.loadingDetail = false;
        }
      });
    }
  }

  // Helper: tính tổng tiền từng item
  getItemTotal(item: any): number {
    return item.price * item.quantity;
  }
}
