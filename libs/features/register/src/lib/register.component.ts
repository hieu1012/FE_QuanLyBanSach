import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService, RegisterRequest } from '@emi/features/shared/service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector   : 'emi-register',
  templateUrl: './register.component.html',
  styleUrls  : ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  loading = false;
  errorMsg = '';
  successMsg = '';
  isSuccessModalVisible = false;

  constructor(
    private fb: FormBuilder,
    private registerService: AuthService,
    private router: Router,
    private notification: NzNotificationService
  ) {
    this.registrationForm = this.fb.group({
      username       : ['', Validators.required],
      email          : ['', [Validators.required, Validators.email]],
      password       : ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      fullName       : ['', Validators.required],
      phoneNumber    : [
        '',
        [
          Validators.required,
          Validators.pattern(/^(0|\+84)[1-9][0-9]{8,9}$/) // Bạn có thể sửa regex cho đúng kiểu mong muốn
        ]
      ],
      address        : ['', Validators.required],
    }, {validators: this.passwordMatchValidator});
  }

  ngOnInit(): void {
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  passwordMatchValidator(form: AbstractControl) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    if (pass !== confirm) {
      form.get('confirmPassword')?.setErrors({notMatch: true});
    } else {
      if (form.get('confirmPassword')?.errors?.['notMatch']) {
        form.get('confirmPassword')?.setErrors(null);
      }
    }
    return null;
  }

  markFormGroupTouched(): void {
    Object.values(this.registrationForm.controls).forEach(control => {
      control?.markAsTouched();
    });
  }

  closeModal(): void {
    this.isSuccessModalVisible = false;
  }

  onSubmit(): void {
    this.errorMsg = '';
    this.successMsg = '';
    if (this.registrationForm.invalid) {
      this.markFormGroupTouched();
      return;
    }
    this.loading = true;
    const data: RegisterRequest = this.registrationForm.value;
    this.registerService.register(data).subscribe({
      next : (res: any) => {
        this.loading = false;
        this.successMsg = res.message || 'Đăng ký thành công!';
        this.isSuccessModalVisible = true;
        this.notification.success('Đăng ký', this.successMsg);
        setTimeout(() => {
          this.closeModal();
          this.router.navigate(['/dang-nhap']);
        }, 2000);

      },
      error: (err: any) => {
        this.loading = false;
        this.errorMsg = err?.error?.message || 'Đăng ký thất bại, vui lòng thử lại!';
        this.notification.error('Đăng ký', this.errorMsg);
      }
    });
  }
}
