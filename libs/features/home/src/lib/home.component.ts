import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwiperOptions } from 'swiper/types';  // ← mới
@Component({
  selector: 'emi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  bannerConfig: SwiperOptions = {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 700,
    navigation: true,
    pagination: { clickable: true },
    grabCursor: true,
  };

  // Banner slides
  itemBanner = [
    { src: 'assets/shared/images/Banner2.jpg', alt: 'Banner 1' },
    { src: 'assets/shared/images/Banner1.jpg', alt: 'Banner 1' },
  ];

  // Routing constants
  ROUTING = {
    DETAIL_BOOK: 'chi-tiet-sach',
    CATALOG    : 'danh-muc'
  };

  // Danh sách sách
  listBooks = [
    {
      id           : 1,
      title        : 'Cô Gái Đến Từ Hàn Quốc',
      description  : 'Tác phẩm lãng mạn nhẹ nhàng kể về tình yêu và giao thoa văn hóa.',
      price        : 85000.0,
      discountPrice: 68000.0,
      discount     : 20,
      stock        : 50,
      imageUrl     : 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      isActive     : true,
      categoryId   : 1,
      categoryName : 'Sách Văn Học'
    },
    {
      id           : 2,
      title        : 'Tâm Trạng Một Con Người',
      description  : 'Tiểu thuyết tâm lý sâu sắc về nội tâm và các mối quan hệ.',
      price        : 95000.0,
      discountPrice: 76000.0,
      discount     : 20,
      stock        : 35,
      imageUrl     : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop',
      isActive     : true,
      categoryId   : 1,
      categoryName : 'Sách Văn Học'
    },
    {
      id           : 3,
      title        : 'Đắc Nhân Tâm',
      description  : 'Cẩm nang giao tiếp, thuyết phục và xây dựng mối quan hệ bền vững.',
      price        : 120000.0,
      discountPrice: 102000.0,
      discount     : 15,
      stock        : 100,
      imageUrl     : 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
      isActive     : true,
      categoryId   : 3,
      categoryName : 'Kỹ Năng Sống'
    },
    {
      id           : 4,
      title        : 'Sapiens: Lược Sử Loài Người',
      description  : 'Cuốn sách khám phá lịch sử và tiến trình phát triển của loài người.',
      price        : 180000.0,
      discountPrice: 162000.0,
      discount     : 10,
      stock        : 40,
      imageUrl     : 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2187&auto=format&fit=crop',
      isActive     : true,
      categoryId   : 6,
      categoryName : 'Kiến Thức'
    },
    {
      id           : 5,
      title        : 'Tuổi Thơ Dữ Dội',
      description  : 'Tác phẩm về những tháng năm tuổi trẻ đầy dữ dội và cảm xúc.',
      price        : 78000.0,
      discountPrice: 65000.0,
      discount     : 17,
      stock        : 28,
      imageUrl     : 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?w=2070',
      isActive     : true,
      categoryId   : 1,
      categoryName : 'Sách Văn Học'
    },
    {
      id           : 6,
      title        : 'Bí Quyết Làm Giàu',
      description  : 'Những nguyên tắc và thói quen giúp xây dựng sự giàu có bền vững.',
      price        : 140000.0,
      discountPrice: 112000.0,
      discount     : 20,
      stock        : 60,
      imageUrl     : 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=2070&auto=format&fit=crop',
      isActive     : true,
      categoryId   : 2,
      categoryName : 'Sách Kinh Tế'
    },
    {
      id           : 7,
      title        : 'Chuyện Con Mèo Benjamin',
      description  : 'Truyện thiếu nhi ấm áp, phù hợp cho bé phát triển cảm xúc.',
      price        : 49000.0,
      discountPrice: 44000.0,
      discount     : 10,
      stock        : 80,
      imageUrl     : 'https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?w=2070',
      isActive     : true,
      categoryId   : 4,
      categoryName : 'Thiếu Nhi'
    },
    {
      id           : 8,
      title        : 'Toán 10 - Đại Số & Hình Học',
      description  : 'Sách giáo khoa Toán lớp 10, chương trình chuẩn.',
      price        : 99000.0,
      discountPrice: 89900.0,
      discount     : 9,
      stock        : 120,
      imageUrl     : 'https://images.unsplash.com/photo-1509228628319-d263a1925b3b?q=80&w=2070&auto=format&fit=crop',
      isActive     : true,
      categoryId   : 5,
      categoryName : 'Sách Giáo Khoa'
    },
    {
      id           : 9,
      title        : 'Nhà Giả Kim',
      description  : 'Tiểu thuyết triết lý về hành trình tìm kiếm ước mơ của một chàng trai trẻ.',
      price        : 110000.0,
      discountPrice: 93500.0,
      discount     : 15,
      stock        : 45,
      imageUrl     : 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2187&auto=format&fit=crop',
      isActive     : true,
      categoryId   : 1,
      categoryName : 'Sách Văn Học'
    },
    {
      id           : 10,
      title        : 'Người Giàu Có Nhất Thành Babylon',
      description  : 'Những bài học tài chính cổ điển, dễ hiểu và thực tế.',
      price        : 85000.0,
      discountPrice: 68000.0,
      discount     : 20,
      stock        : 70,
      imageUrl     : 'https://images.unsplash.com/photo-1554224155-6726b3ff296f?q=80&w=2070&auto=format&fit=crop',
      isActive     : true,
      categoryId   : 2,
      categoryName : 'Sách Kinh Tế'
    },
    {
      id           : 11,
      title        : 'Sổ Tay Học Sinh - Ghi Chép Thông Minh',
      description  : 'Sổ tay chia kênh cho việc ghi chép, ôn tập hiệu quả cho học sinh.',
      price        : 39000.0,
      discountPrice: 35000.0,
      discount     : 10,
      stock        : 200,
      imageUrl     : 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?w=2070',
      isActive     : true,
      categoryId   : 5,
      categoryName : 'Sách Giáo Khoa'
    },
    {
      id           : 12,
      title        : 'Kỹ Năng Giao Tiếp Hiệu Quả',
      description  : 'Hướng dẫn các kỹ thuật giao tiếp để thuyết phục và lắng nghe tốt hơn.',
      price        : 125000.0,
      discountPrice: 106250.0,
      discount     : 15,
      stock        : 55,
      imageUrl     : 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop',
      isActive     : true,
      categoryId   : 3,
      categoryName : 'Kỹ Năng Sống'
    }
  ];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  // Lấy sách theo danh mục
  getBooksByCategory(categoryName: string) {
    return this.listBooks.filter(book => book.categoryName === categoryName);
  }

  // Lấy sách mới (6 quyển đầu)
  getNewBooks() {
    return this.listBooks.slice(0, 6);
  }

  // Điều hướng đến trang chi tiết
  navigateToDetail(bookId: number) {
    this.router.navigate(['/', this.ROUTING.DETAIL_BOOK, bookId]);
  }

  // Điều hướng đến danh mục
  navigateToCatalog(category: string) {
    this.router.navigate(['/', this.ROUTING.CATALOG, category]);
  }
}
