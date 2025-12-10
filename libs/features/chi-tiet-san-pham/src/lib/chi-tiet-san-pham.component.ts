import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService, CartService } from '@emi/features/shared/service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'emi-chi-tiet-san-pham',
  templateUrl: './chi-tiet-san-pham.component.html',
  styleUrls: ['./chi-tiet-san-pham.component.scss'],
})
export class ChiTietSanPhamComponent implements OnInit {
  book: any = null;           // Dữ liệu sách từ API
  bookId: number | null = null;

  mainImage = '';     // Ảnh đang hiển thị chính
  quantity = 1;       // Số lượng mua (dùng cho nút +/-)

  constructor(
    private route: ActivatedRoute,
    private bookService: ProductService,
    private cartService: CartService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id) {
        this.bookId = +id;
        this.loadBook(this.bookId);
      }
    });
  }

  loadBook(id: number) {
    this.bookService.getProductById(id).subscribe({
      next: (response) => {
        console.log('API trả về:', response);
        this.book = response.data;  // response.data chính là object sách của bạn

        // Tự động chọn ảnh đầu tiên làm ảnh chính
        if (this.book?.imageUrls && this.book.imageUrls.length > 0) {
          this.mainImage = this.book.imageUrls[0];
        }

        // Reset số lượng về 1 mỗi khi load sách mới
        this.quantity = 1;
      },
      error: (err) => {
        console.error('Không tìm thấy sách', err);
        // Có thể thêm toast hoặc redirect 404 ở đây
      }
    });
  }

  // Hàm thay đổi ảnh chính khi click thumbnail
  selectImage(imageUrl: string) {
    this.mainImage = imageUrl;
  }

  // Tăng số lượng
  increaseQuantity() {
    if (this.quantity < this.book.stock) {
      this.quantity++;
    }
  }

  // Giảm số lượng
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Thêm vào giỏ hàng
  addToCart() {
    if(!this.bookId) return;

    this.cartService.addItemToCart(this.bookId, this.quantity).subscribe({
      next: (response) => {
        // this.notification.success('Thêm vào giỏ hàng', response.message);
        if(!this.bookId) return;
        this.loadBook(this.bookId);
      },
      error: (err) => {
        console.error('Lỗi khi thêm vào giỏ hàng', err);
        this.notification.error('Thêm vào giỏ hàng', err ?.error?.message || 'Thêm vào giỏ hàng thất bại!');
        // Hiển thị thông báo lỗi
      }
    });
  }
}
