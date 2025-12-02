import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'emi-form-product',
  templateUrl: './form-product.component.html'
})
export class FormProductComponent implements OnInit {
  @Input() categoryList: any[] = [];
  @Input() product?: any;


  productForm!: FormGroup;

  // Format tiền đẹp
  formatterVND = (value: number | null): string =>
    value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
  parserVND = (value: string): string => value.replace(/,/g, '');

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      categoryId: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      discount: [0, [Validators.min(0), Validators.max(100)]], // % giảm giá
      stock: [0, [Validators.required, Validators.min(0)]],
      imageName: [''],
      isActive: [true]
    });

    if (this.product) {
      this.productForm.patchValue({
        title: this.product.title,
        description: this.product.description,
        categoryId: this.product.categoryId,
        price: this.product.price,
        discount: this.product.discount,
        stock: this.product.stock,
        imageName: this.product.imageName,
        isActive: this.product.isActive
      });
    }


    // Tự động tính discountPrice khi price hoặc discount thay đổi
    this.productForm.get('price')?.valueChanges.subscribe(() => {
      this.calculateDiscountPrice();
    });

    this.productForm.get('discount')?.valueChanges.subscribe(() => {
      this.calculateDiscountPrice();
    });
  }

  // Tính giá sau khi giảm
  calculateDiscountPrice(): void {
    const price = this.productForm.get('price')?.value || 0;
    const discountPercent = this.productForm.get('discount')?.value || 0;

    const discountAmount = price * discountPercent / 100;
    const finalPrice = price - discountAmount;

    // Không cần lưu vào form, chỉ tính khi submit
  }

  // Getter để hiển thị
  get originalPrice(): number {
    return this.productForm.get('price')?.value || 0;
  }

  get discountPercent(): number {
    return this.productForm.get('discount')?.value || 0;
  }

  get discountPrice(): number {
    const price = this.originalPrice;
    const percent = this.discountPercent;
    return price - (price * percent / 100);
  }

  get savedAmount(): number {
    return this.originalPrice - this.discountPrice;
  }

  submitForm(): void {
    if (this.productForm.invalid) {
      Object.values(this.productForm.controls).forEach(c => c.markAsDirty());
      return;
    }

    const formValue = this.productForm.getRawValue();

    // Thêm discountPrice vào payload trước khi gửi
    const payload = {
      ...formValue,
      discountPrice: this.discountPrice
    };

    console.log('Gửi lên backend:', payload);
    this.modal.close(payload);
  }

  cancel(): void {
    this.modal.close(null);
  }
}
