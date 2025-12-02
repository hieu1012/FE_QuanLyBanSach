import { Component, OnInit } from '@angular/core';
import { AuthService, ProductService } from '@emi/features-admin/shared/data-access';

@Component({
  selector: 'emi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  username = 'master';
  password = '1111';
  error = '';



  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        // alert('Đăng nhập thành công!');
        window.location.href = '/dashboard';
      },
      error: (err) => {
        alert(err.error?.message);
      }
    });
  }
}
