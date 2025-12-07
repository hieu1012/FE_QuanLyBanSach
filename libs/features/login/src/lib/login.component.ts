import { Component } from '@angular/core';
import { AuthService, AuthUser } from '@emi/features/shared/service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'emi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  remember: boolean = false;
  loading: boolean = false;
  errorMsg: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  onSubmit() {
    this.errorMsg = '';
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe({
      next: (res: any) => {
        this.loading = false;
        // Đăng nhập thành công
        this.authService.user$.subscribe();
        this.notification.success('Đăng nhập', 'Đăng nhập thành công!');
        this.router.navigate(['/trang-chu']); // hoặc tới trang chính của bạn
      },
      error: (err: any) => {
        this.loading = false;
        this.errorMsg = err?.error?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!';
        this.notification.error('Đăng nhập', this.errorMsg);
      }
    });
  }
}
