import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'emi-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {


  registrationForm: FormGroup;

  genders = [
    { value: 'male', label: 'Nam' },
    { value: 'female', label: 'Nữ' },
    { value: 'other', label: 'Khác' }
  ];

  countries = [
    { value: 'vn', label: 'Việt Nam' },
    { value: 'us', label: 'Hoa Kỳ' },
    { value: 'jp', label: 'Nhật Bản' }
  ];

  languages = [
    { value: 'vi', label: 'Tiếng Việt' },
    { value: 'en', label: 'English' },
    { value: 'jp', label: '日本語' }
  ];

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      language: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      address: ['', [Validators.required]],
      postalCode: ['', [Validators.required]]
    });
  }

  ngOnInit(): void { }



  private markFormGroupTouched(): void {
    Object.keys(this.registrationForm.controls).forEach(key => {
      const control = this.registrationForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // xử lý phần model
  isSuccessModalVisible = true;
  countdown = '00:50';

  // ... other properties ...


  closeModal(): void {
    console.log('Closing modal'); // Debug log
    this.isSuccessModalVisible = false;
  }

  onSubmit(): void {
    console.log('Form submitted'); // Debug log
    if (this.registrationForm.valid) {
      this.isSuccessModalVisible = true;
      console.log('Modal should show:', this.isSuccessModalVisible); // Debug log
    } else {
      this.markFormGroupTouched();
    }
  }


}
