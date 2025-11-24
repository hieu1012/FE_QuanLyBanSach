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
        console.log('Đăng nhập thành công!', res);
        if(res){
          this.productService.getProduct().subscribe({
          next: (productRes) => {
            console.log('Product data:', productRes);
          },
          error: (productErr) => {
            console.error('Failed to fetch product data', productErr);
          }
        });
        }
      },
      error: (err) => {
        this.error = 'Sai tài khoản hoặc mật khẩu!';
        console.error('Login failed', err);
      }
    });
  }
}
