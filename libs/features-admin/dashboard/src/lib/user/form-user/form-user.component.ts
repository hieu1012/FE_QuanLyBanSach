import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'emi-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnInit {
  @Input() user?: any;

  userForm!: FormGroup;

  hidePass = true;
  // Danh sách vai trò
  readonly roleOptions = [
    { value: 'USER', label: 'Người dùng' },
    { value: 'ADMIN', label: 'Quản trị viên' }
  ];

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^\S+$/)]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      address: [''],
      password: ['', this.user ? [] : [Validators.required, Validators.minLength(6)]], // Nếu sửa thì optional
      role: ['', Validators.required],
      // isActive: [true]
    });

    if (this.user) {
      this.userForm.patchValue({
        username: this.user.username,
        fullName: this.user.fullName,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        address: this.user.address,
        role: this.user.role,
        // isActive: !!this.user.isActive
      });
      // Nếu sửa thì password là tùy chọn, không required
      this.userForm.get('password')?.setValidators([]);
    }
  }

  submitForm(): void {
    if (this.userForm.invalid) {
      Object.values(this.userForm.controls).forEach(c => c.markAsDirty());
      return;
    }

    const formValue = this.userForm.getRawValue();
    // Nếu cập nhật user mà không nhập password thì xóa trường password
    if (!formValue.password) {
      delete formValue.password;
    }
    if(this.user){
      delete formValue.username;
      delete formValue.role;
    }

    // Trả về dữ liệu khi submit
    this.modal.close(formValue);
  }

  cancel(): void {
    this.modal.close(null);
  }
}
