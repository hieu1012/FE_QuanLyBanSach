// form-change-password.component.ts  ← GIỮ NGUYÊN NHƯ BẠN ĐÃ CÓ
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '@emi/features-admin/shared/data-access';

@Component({
  selector: 'emi-form-change-password',
  templateUrl: './form-change-password.component.html',
  styleUrls: ['./form-change-password.component.scss']
})
export class FormChangePasswordComponent implements OnInit {
  @Input() userId!: number;
  @Input() username!: string;

  form!: FormGroup;
  isLoading = false;
  hideNew = true;
  hideConfirm = true;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private userService: UserService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatch });
  }

  passwordMatch = (g: FormGroup) => {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  };

  submit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    const { newPassword, confirmPassword } = this.form.value;

    this.userService.changePassword(this.userId, newPassword, confirmPassword).subscribe({
      next: () => {
        // this.message.success(`Đổi mật khẩu thành công cho ${this.username}`);
        this.modal.close(true);
      },
      error: (err) => {
        // this.message.error(err.error?.message || 'Đổi mật khẩu thất bại');
        this.isLoading = false;
      }
    });
  }

  cancel() {
    this.modal.close();
  }
}
