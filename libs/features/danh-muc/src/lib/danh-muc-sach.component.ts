import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@emi/features/shared/service';

interface Book {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPrice: number;
  discount: number;
  stock: number;
  imageUrls: string[];
  isActive: boolean;
  categoryId: number;
  categoryName: string;
  authorName?: string;
  publisherName?: string;
}

@Component({
  selector: 'emi-danh-muc-sach',
  templateUrl: './danh-muc-sach.component.html',
  styleUrls: ['./danh-muc-sach.component.scss'],
})
export class DanhMucSachComponent implements OnInit {
  // Routing
  ROUTING = {
    DETAIL_PRODUCT: 'san-pham'
  };

  // Data
  allBooks: Book[] = [];
  filteredBooks: Book[] = [];
  pagedProducts: Book[] = [];

  categories: any[] = [];
  authors: any[] = [];
  publishers: any[] = [];

  // Filter states
  selectedCategories: { [key: number]: boolean } = {};
  selectedAuthors: { [key: number]: boolean } = {};
  selectedPublishers: { [key: number]: boolean } = {};
  selectedPriceRange: string | null = null;

  // Sort & Pagination
  sortOption: string = 'az';
  currentPage: number = 1;
  pageSize: number = 20;
  totalPages: number = 1;

  // Category name for title
  categorySlug: string = '';
  categoryTitle: string = 'Tất cả sản phẩm';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Get category from route
    this.route.params.subscribe(params => {
      this.categorySlug = params['category'] || '';
      this.updateCategoryTitle();
      this.loadProducts();
    });
  }

  updateCategoryTitle(): void {
    const titleMap: { [key: string]: string } = {
      'sach-moi': 'Sách Mới Phát Hành',
      'van-hoc': 'Sách Văn Học',
      'kinh-te': 'Sách Kinh Tế',
      'ky-nang-song': 'Kỹ Năng Sống',
      'thieu-nhi': 'Sách Thiếu Nhi',
      'giao-khoa': 'Sách Giáo Khoa',
      'kien-thuc': 'Kiến Thức Tổng Hợp'
    };
    this.categoryTitle = titleMap[this.categorySlug] || 'Tất cả sản phẩm';
  }

  loadProducts(): void {
    this.productService.getProduct().subscribe({
      next: (res) => {
        this.allBooks = res?.data?.map((book: any) => ({
          ...book,
          imageUrls: book.imageUrls || [],
          discountPrice: book.discountPrice || book.price,
          categoryName: book.categoryName || 'Chưa phân loại'
        })) || [];

        // Extract unique values for filters
        this.extractFilterOptions();

        // Apply initial filter if category slug exists
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error loading products:', err);
        alert(err.error?.message || 'Không thể tải sản phẩm');
      }
    });
  }

  extractFilterOptions(): void {
    // Extract categories
    const categoryMap = new Map();
    this.allBooks.forEach(book => {
      if (book.categoryName && !categoryMap.has(book.categoryName)) {
        categoryMap.set(book.categoryName, {
          id: book.categoryId,
          name: book.categoryName
        });
      }
    });
    this.categories = Array.from(categoryMap.values());

    // Extract authors (if available)
    const authorMap = new Map();
    this.allBooks.forEach((book, index) => {
      const authorName = book.authorName || `Tác giả ${index + 1}`;
      if (!authorMap.has(authorName)) {
        authorMap.set(authorName, {
          id: index,
          name: authorName
        });
      }
    });
    this.authors = Array.from(authorMap.values());

    // Extract publishers (if available)
    const publisherMap = new Map();
    this.allBooks.forEach((book, index) => {
      const publisherName = book.publisherName || `Nhà xuất bản ${index + 1}`;
      if (!publisherMap.has(publisherName)) {
        publisherMap.set(publisherName, {
          id: index,
          name: publisherName
        });
      }
    });
    this.publishers = Array.from(publisherMap.values());
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.allBooks];

    // Filter by category slug from route
    if (this.categorySlug) {
      const categoryMap: { [key: string]: string } = {
        'van-hoc': 'Sách Văn Học',
        'kinh-te': 'Sách Kinh Tế',
        'ky-nang-song': 'Kỹ Năng Sống',
        'thieu-nhi': 'Thiếu Nhi',
        'giao-khoa': 'Sách Giáo Khoa',
        'kien-thuc': 'Kiến Thức'
      };
      const categoryName = categoryMap[this.categorySlug];
      if (categoryName) {
        filtered = filtered.filter(book => book.categoryName === categoryName);
      }
    }

    // Filter by selected categories
    const selectedCategoryIds = Object.keys(this.selectedCategories)
      .filter(key => this.selectedCategories[+key])
      .map(key => +key);
    if (selectedCategoryIds.length > 0) {
      filtered = filtered.filter(book => selectedCategoryIds.includes(book.categoryId));
    }

    // Filter by price range
    if (this.selectedPriceRange) {
      const [min, max] = this.selectedPriceRange.split('-').map(Number);
      filtered = filtered.filter(book => {
        const price = book.discountPrice || book.price;
        return price >= min && price <= max;
      });
    }

    this.filteredBooks = filtered;
    this.applySorting();
  }

  applySorting(): void {
    let sorted = [...this.filteredBooks];

    switch (this.sortOption) {
      case 'az':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'low-high':
        sorted.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'high-low':
        sorted.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
    }

    this.filteredBooks = sorted;
    this.updatePagination();
  }

  setSort(option: string): void {
    this.sortOption = option;
    this.currentPage = 1;
    this.applySorting();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredBooks.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedProducts = this.filteredBooks.slice(start, end);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  clearFilters(): void {
    this.selectedCategories = {};
    this.selectedAuthors = {};
    this.selectedPublishers = {};
    this.selectedPriceRange = null;
    this.currentPage = 1;
    this.applyFilters();
  }

  navigateToDetail(bookId: number): void {
    this.router.navigate(['/san-pham', bookId]);
  }
}
