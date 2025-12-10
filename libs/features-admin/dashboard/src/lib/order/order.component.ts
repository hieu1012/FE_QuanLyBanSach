import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminOrderService } from '@emi/features-admin/shared/data-access';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';

interface Order {
  id: number;
  orderId: string;
  orderDate: number[]; // [year, month, day, hour, minute, second, ...]
  status: string;
  paymentType: string;
  totalPrice: number;
  firstProductTitle: string | null;
  totalItem: number | null;
  userEmail: string;
}

@Component({
  selector: 'emi-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  total = 0;
  loading = false;
  pageIndex = 1;
  pageSize = 10;
  quickKeyword = '';

  filterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminOrderService: AdminOrderService,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {
    this.filterForm = this.fb.group({
      status: [null],
      startDate: [null],
      endDate: [null]
    });
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  // Chuyển mảng orderDate → Date object → String đẹp
  formatOrderDate(dateArray: number[]): string {
    if (!dateArray || dateArray.length < 6) return '—';

    const [year, month, day, hour, minute, second] = dateArray;
    const date = new Date(year, month - 1, day, hour, minute, second);

    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', '');
  }

  // Helper: Format ngày filter → YYYY-MM-DD
  private formatFilterDate(date: Date | null): string | undefined {
    if (!date) return undefined;
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  // Thay toàn bộ phần loadOrders() bằng đoạn này
  loadOrders(): void {
    this.loading = true;

    const params: any = {
      page: this.pageIndex - 1,
      size: this.pageSize,
    };

    // Quick search
    if (this.quickKeyword?.trim()) {
      params.keyword = this.quickKeyword.trim();
    }

    // Advanced filter
    const f = this.filterForm.value;

    if (f.status) {
      params.status = f.status;
    }

    // Fix lỗi [Object object] - CHỈ LẤY NGÀY, KHÔNG GIỜ
    if (f.startDate) {
      const start = new Date(f.startDate);
      params.startDate = start.toISOString().split('T')[0]; // yyyy-MM-dd
    }

    if (f.endDate) {
      const end = new Date(f.endDate);
      // Đảm bảo endDate bao gồm cả ngày cuối (backend thường lọc < endDate)
      end.setHours(23, 59, 59, 999);
      params.endDate = end.toISOString().split('T')[0];
    }

    this.adminOrderService.getOrders(params).subscribe({
      next: (res: any) => {
        this.orders = res.data?.content || res.content || [];
        this.total = res.data?.totalElements || res.totalElements || 0;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.notification.error('Lỗi', err.error?.message || 'Không tải được đơn hàng');
      }
    });
  }

  onTableChange(params: NzTableQueryParams): void {
    this.pageIndex = params.pageIndex;
    this.pageSize = params.pageSize;
    this.loadOrders();
  }

  onQuickSearch(): void {
    this.pageIndex = 1;
    this.loadOrders();
  }

  onAdvanceSearch(): void {
    this.pageIndex = 1;  // Quan trọng! Không có dòng này sẽ ở trang cũ → không thấy kết quả
    this.loadOrders();
  }

  resetFilter(): void {
    this.filterForm.reset();
    this.quickKeyword = '';
    this.pageIndex = 1;
    this.loadOrders();
  }

  viewDetail(orderId: number): void {
    this.modal.info({
      nzTitle: `Chi tiết đơn hàng #${orderId}`,
      nzContent: 'Sắp có modal chi tiết đẹp lung linh!',
      nzWidth: 900,
      nzCentered: true
    });
  }

  updateStatus(orderId: number, status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCEL_REQUESTED' | 'CANCELLED'): void {
    this.adminOrderService.updateOrderStatus(orderId, status).subscribe({
      next: () => {
        this.notification.success('Thành công', 'Cập nhật trạng thái thành công!');
        this.loadOrders();
      },
      error: (err) => {
        this.notification.error('Lỗi', err.error?.message || 'Cập nhật thất bại');
      }
    });
  }

  canCancel(status: string): boolean {
    return ['PENDING', 'PROCESSING'].includes(status);
  }

  getStatusText(status: string): string {
    const map: Record<string, string> = {
      PENDING: 'Chờ xử lý',
      PROCESSING: 'Đang xử lý',
      SHIPPED: 'Đang giao',
      DELIVERED: 'Đã giao',
      CANCEL_REQUESTED: 'Yêu cầu hủy',
      CANCELLED: 'Đã hủy'
    };
    return map[status] || status;
  }

  getStatusColor(status: string): string {
    const map: Record<string, string> = {
      PENDING: 'orange',
      PROCESSING: 'blue',
      SHIPPED: 'purple',
      DELIVERED: 'green',
      CANCEL_REQUESTED: 'volcano',
      CANCELLED: 'red'
    };
    return map[status] || 'default';
  }
}
