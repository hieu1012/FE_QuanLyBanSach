import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService, UserPayload } from '@emi/features-admin/shared/data-access';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormUserComponent } from './form-user/form-user.component'; // import form user component

@Component({
  selector: 'emi-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  // Search/filter controls
  quickKeyword = '';
  filterForm: FormGroup;

  // User list & table
  listOfUser: any[] = [];
  loading = false;
  total = 0;
  pageSize = 10;
  pageIndex = 1;
  sortField: string | null = null;
  sortOrder: string | null = null;
  allChecked = false;

  readonly roleOptions = [
    { value: '', label: 'Tất cả vai trò' },
    { value: 'ADMIN', label: 'Quản trị viên' },
    { value: 'USER', label: 'Người dùng' }
  ];

  // status filter option
  readonly statusOptions = [
    { label: 'Tất cả', value: '' },
    { label: 'Hoạt động', value: true },
    { label: 'Tạm ngưng', value: false }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) {
    this.filterForm = this.fb.group({
      role: [''],
      isActive: ['']
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  // Quick keyword search (Enter or click Search)
  onQuickSearch(): void {
    this.pageIndex = 1;
    this.loadUsers();
  }

  // "Áp dụng" nâng cao
  onAdvanceSearch(): void {
    this.pageIndex = 1;
    this.loadUsers();
  }

  // Reset filter
  onResetFilter(event: Event): void {
    event.preventDefault();
    this.filterForm.reset({ role: '', isActive: '' });
    this.pageIndex = 1;
    this.loadUsers();
  }

  onQueryParamsChange(params: any): void {
    this.pageSize = params.pageSize;
    this.pageIndex = params.pageIndex;
    const currentSort = params.sort.find((item: any) => item.value !== null);
    this.sortField = currentSort?.key || null;
    this.sortOrder = currentSort?.value || null;
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    const formVal = this.filterForm.value;
    const sortArr: string[] = [];
    if (this.sortField && this.sortOrder) {
      sortArr.push(`${this.sortField},${this.sortOrder === 'ascend' ? 'asc' : 'desc'}`);
    }

    const isActiveValue = formVal.isActive === '' ? undefined : formVal.isActive;
    const roleValue = formVal.role || undefined;
    const keyword = this.quickKeyword?.trim() || undefined;

    this.userService.getUsersPage(
      this.pageIndex - 1,
      this.pageSize,
      sortArr,
      keyword,
      roleValue,
      isActiveValue
    ).subscribe({
      next: (res: any) => {
        this.total = res.totalElements ?? res.data?.length ?? 0;
        // Lọc bỏ tài khoản MASTER, không hiển thị trên bảng
        this.listOfUser = (res.content ?? res.data ?? []).filter((u: any) => u.role !== 'MASTER');
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
        this.notification.error('Lỗi', err.error?.message || 'Không thể tải danh sách người dùng');
      }
    });
  }

  checkAll(value: boolean): void {
    this.allChecked = value;
    this.listOfUser.forEach(item => item.checked = value);
  }

  updateAllChecked(): void {
    this.allChecked = this.listOfUser.length > 0 && this.listOfUser.every(item => item.checked);
  }

  // Thêm hoặc cập nhật user
  onAddNew(user?: any): void {
    const modal = this.modal.create({
      nzContent: FormUserComponent,
      nzComponentParams: {
        user: user ? { ...user } : undefined
      },
      nzWidth: 700,
      nzTitle: user ? 'Cập nhật người dùng' : 'Thêm người dùng mới',
      nzFooter: null,
      nzCentered: true
    });

    modal.afterClose.subscribe((userData: UserPayload | null) => {
      if (userData) {
        if (user) {
          // Cập nhật user
          this.userService.updateUser(user.id, userData).subscribe({
            next: () => {
              this.notification.success('Cập nhật', 'Cập nhật người dùng thành công!');
              this.loadUsers();
            },
            error: (err) => {
              this.notification.error('Lỗi', err.error?.message || 'Không thể cập nhật người dùng');
            }
          });
        } else {
          // Thêm user mới
          this.userService.addUser(userData).subscribe({
            next: () => {
              this.notification.success('Thêm mới', 'Thêm người dùng thành công!');
              this.loadUsers();
            },
            error: (err) => {
              this.notification.error('Lỗi', err.error?.message || 'Không thể thêm người dùng');
            }
          });
        }
      }
    });
  }

  onDeleteUser(userId: number): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa người dùng này?',
      nzOkDanger: true, // <-- Thay vì nzOkType: 'danger'
      nzOnOk: () => {
        this.userService.deleteUser(userId).subscribe({
          next: () => {
            this.notification.success('Xóa thành công', 'Người dùng đã được xóa!');
            this.loadUsers();
          },
          error: (err) => {
            this.notification.error('Lỗi', err.error?.message || 'Không thể xóa người dùng');
          }
        });
      }
    });
  }
}