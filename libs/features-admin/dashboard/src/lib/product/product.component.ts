import { Component, OnInit } from '@angular/core';
import { AuthService, ProductService } from '@emi/features-admin/shared/data-access';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzTableQueryParams, NzTableSortOrder, NzTableSortFn } from 'ng-zorro-antd/table';
import { FormProductComponent } from './form-product/form-product.component'; // Đường dẫn đúng
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'emi-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  quickKeyword = '';
  filterForm: FormGroup;
  categoryList = [
    { id: 1, name: 'Sách Văn Học' },
    { id: 2, name: 'Sách Kỹ Thuật' },
    // ... Thêm danh mục thực tế
  ];
  listOfProduct: any[] = [];
  total = 0;
  loading = false;
  pageSize = 10;
  pageIndex = 1;
  sortField: string | null = null;
  sortOrder: string | null = null;
  allChecked = false;


  constructor(private fb: FormBuilder, private productService: ProductService, private modal: NzModalService) {
    this.filterForm = this.fb.group({
      categoryId: [null],
      minPrice: [null],
      maxPrice: [null],
      minStock: [null]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  isFilterModalVisible = false;

  // Xử lý nút tìm kiếm nhanh
  onQuickSearch(): void {
    this.pageIndex = 1;
    this.loadProducts();
  }

  // Xử lý "Áp dụng" bộ lọc nâng cao
  onAdvanceSearch(): void {

    this.pageIndex = 1;
    this.loadProducts();
  }

  // Reset bộ lọc nâng cao
  onResetFilter(event: Event): void {
    event.preventDefault();
    this.filterForm.reset();
    this.pageIndex = 1;
    this.loadProducts();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pageSize = params.pageSize;
    this.pageIndex = params.pageIndex;
    const currentSort = params.sort.find(item => item.value !== null);
    this.sortField = currentSort?.key || null;
    this.sortOrder = currentSort?.value || null;
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    const formVal = this.filterForm.value;
    const sortArr: string[] = [];
    if (this.sortField && this.sortOrder) {
      sortArr.push(`${this.sortField},${this.sortOrder === 'ascend' ? 'asc' : 'desc'}`);
    }
    // Lấy keyword ưu tiên theo tìm kiếm nhanh
    const keyword = this.quickKeyword?.trim() || undefined;
    this.productService
      .getProductsHasPage(
        this.pageIndex - 1,
        this.pageSize,
        sortArr,
        keyword,
        formVal.categoryId,
        formVal.minPrice,
        formVal.maxPrice,
        formVal.minStock
      )
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.total = res.totalElements;
          this.listOfProduct = res.content;
        },
        error: (err) => {
          this.loading = false;
          alert(err.error?.message);
        }
      });
  }

  checkAll(value: boolean): void {
    this.allChecked = value;
    this.listOfProduct.forEach(item => item.checked = value);
  }

  updateAllChecked(): void {
    this.allChecked = this.listOfProduct.length > 0 && this.listOfProduct.every(item => item.checked);
  }

  onAddNew(product?: any) {
    const modal = this.modal.create({
      nzContent: FormProductComponent,
      nzComponentParams: { categoryList: this.categoryList },
      nzWidth: 700,
      nzTitle: 'Thêm sản phẩm mới',
      nzFooter: null,
      nzCentered: true
    });


    modal.afterClose.subscribe((productData) => {
      console.log('Dữ liệu sản phẩm nhận được từ modal:', productData);
      // if (productData) {
      //   this.productService.addProduct(productData).subscribe({
      //     next: (res) => {
      //       console.log('Thêm sản phẩm thành công', res);
      //       this.loadProducts();
      //     },
      //     error: (err) => {
      //       // Báo lỗi nếu cần
      //     }
      //   });
      // }
    });
  }

  onDeleteProduct(productId: number) {
    // Xử lý xóa sản phẩm
    console.log('Xóa sản phẩm với ID:', productId);
  }
}