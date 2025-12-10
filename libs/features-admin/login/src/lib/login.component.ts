// import { Component, OnInit } from '@angular/core';
// import { AuthService, ProductService } from '@emi/features-admin/shared/data-access';
//
// @Component({
//   selector: 'emi-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })
// export class LoginComponent implements OnInit {
//   constructor(
//     private authService: AuthService,
//     private productService: ProductService
//   ) {}
//
//   ngOnInit(): void {}
//
//   username = 'master';
//   password = '1111';
//   error = '';
//
//
//
//   onSubmit() {
//     this.authService.login(this.username, this.password).subscribe({
//       next: (res) => {
//         // alert('Đăng nhập thành công!');
//         window.location.href = '/dashboard';
//       },
//       error: (err) => {
//         alert(err.error?.message);
//       }
//     });
//   }
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '@emi/features-admin/shared/data-access';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector   : 'emi-login',
  templateUrl: './login.component.html',
  styleUrls  : ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Form
  loginForm: FormGroup;
  submitted = false;
  isLoading = false;
  showPassword = false;
  serverError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notification: NzNotificationService
  ) {
    this.loginForm = this.fb.group({
      username: ['master', [Validators.required, Validators.minLength(3)]],
      password: ['1111', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    // Nếu đã đăng nhập → tự động chuyển về dashboard
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Convenience getter để dễ dùng trong template
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.submitted = true;
    this.serverError = '';

    // Dừng nếu form không hợp lệ
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;

    const {username, password} = this.loginForm.value;

    this.authService
      .login(username.trim(), password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next : (response) => {
          this.isLoading = false;
          // Đăng nhập thành công → chuyển hướng
          console.log('Đăng nhập thành công:', response);
          if (response.user.role === 'USER') {
            this.notification.error('Lỗi', 'Bạn không có quyền truy cập trang quản trị.');
            this.authService.logout();
            return;
          }
          this.router.navigate(['/dashboard/categories']);
        },
        error: (err) => {
          this.isLoading = false;
          this.serverError =
            err.error?.message ||
            err.message ||
            'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.';
        },
      });
  }
}
