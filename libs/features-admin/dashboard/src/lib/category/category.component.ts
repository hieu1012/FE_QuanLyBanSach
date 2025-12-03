import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '@emi/features-admin/shared/data-access';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormCategoryComponent } from './form-category/form-category.component';
@Component({
  selector: 'emi-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  quickKeyword = '';
  filterForm: FormGroup;
  listOfCategory: any[] = [];
  total = 0;
  loading = false;
  pageSize = 10;
  pageIndex = 1;
  sortField: string | null = null;
  sortOrder: string | null = null;
  allChecked = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) {
    this.filterForm = this.fb.group({
      // Có thể mở rộng thêm bộ lọc nếu muốn (ví dụ: name)
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  onQuickSearch(): void {
    this.pageIndex = 1;
    this.loadCategories();
  }

  onAdvanceSearch(): void {
    this.pageIndex = 1;
    this.loadCategories();
  }

  onResetFilter(event: Event): void {
    event.preventDefault();
    this.filterForm.reset();
    this.pageIndex = 1;
    this.loadCategories();
  }

  onQueryParamsChange(params: any): void {
    this.pageSize = params.pageSize;
    this.pageIndex = params.pageIndex;
    const currentSort = params.sort.find((item: any) => item.value !== null);
    this.sortField = currentSort?.key || null;
    this.sortOrder = currentSort?.value || null;
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    const formVal = this.filterForm.value;
    const sortArr: string[] = [];
    if (this.sortField && this.sortOrder) {
      sortArr.push(`${this.sortField},${this.sortOrder === 'ascend' ? 'asc' : 'desc'}`);
    }
    const keyword = this.quickKeyword?.trim() || undefined;

    this.categoryService
      .getCategoriesHasPage(
        this.pageIndex - 1,
        this.pageSize,
        sortArr,
        keyword
      )
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.total = res.totalElements;
          this.listOfCategory = res.content;
        },
        error: (err) => {
          this.loading = false;
          this.notification.error('Lỗi', err.error?.message || 'Không thể tải danh mục');
        }
      });
  }

  checkAll(value: boolean): void {
    this.allChecked = value;
    this.listOfCategory.forEach(item => item.checked = value);
  }

  updateAllChecked(): void {
    this.allChecked = this.listOfCategory.length > 0 && this.listOfCategory.every(item => item.checked);
  }

  onAddOrEditCategory(category?: any) {
    const isEdit = !!category;
    const modal = this.modal.create({
      nzTitle: isEdit ? 'Cập nhật danh mục' : 'Thêm danh mục mới',
      nzContent: FormCategoryComponent,
      nzComponentParams: {
        category: category ? { ...category } : null
      },
      nzWidth: 500,
      nzFooter: null,
      nzCentered: true
    });

    modal.afterClose.subscribe((categoryData) => {
      if (categoryData) {
        if (isEdit) {
          this.categoryService.updateCategory(category.id, categoryData).subscribe({
            next: () => {
              this.notification.success('Cập nhật thành công', 'Danh mục đã được cập nhật!');
              this.loadCategories();
            },
            error: (err) => {
              this.notification.error('Lỗi', err.error?.message || 'Cập nhật danh mục thất bại');
            }
          });
        } else {
          this.categoryService.addCategory(categoryData).subscribe({
            next: () => {
              this.notification.success('Thêm thành công', 'Đã thêm danh mục mới!');
              this.loadCategories();
            },
            error: (err) => {
              this.notification.error('Lỗi', err.error?.message || 'Thêm danh mục thất bại');
            }
          });
        }
      }
    });
  }

  onDeleteCategory(categoryId: number) {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa danh mục này?',
      nzOkDanger: true,
      nzOnOk: () => {
        this.categoryService.deleteCategory(categoryId).subscribe({
          next: () => {
            this.notification.success('Đã xóa', 'Danh mục đã được xóa!');
            this.loadCategories();
          },
          error: (err) => {
            this.notification.error('Lỗi', err.error?.message || 'Không thể xóa danh mục');
          }
        });
      }
    });
  }
}