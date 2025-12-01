import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ProductService } from '@emi/features-admin/shared/data-access';

@Component({
  selector: 'emi-form-product',
  templateUrl: './form-product.component.html'
})
export class FormProductComponent implements OnInit {
  @Input() categoryList: any[] = [];

  productForm!: FormGroup;

  // Formatter cho input number VNĐ
  formatterVND = (value: number): string => {
    if (!value) return '0';
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  parserVND = (value: string): string => value.replace(/\$\s?|(,*)/g, '');

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      categoryId: [null, Validators.required],
      title: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      discountPrice: [null, Validators.min(0)],
      discount: [null, [Validators.min(0), Validators.max(100)]],
      stock: [null, [Validators.required, Validators.min(0)]],
      imageName: [''],
      isActive: [true],
      category: this.fb.group({
        id: [null, Validators.required],
        name: ['']
      })
    });
  }

  submitForm(): void {
    if (this.productForm.valid) {
      console.log('Form Value:', this.productForm.value);
      this.modal.close(this.productForm.value);
    } else {
      // Mark all fields as dirty to show validation errors
      Object.values(this.productForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  cancel(): void {
    this.modal.close(null);
  }
}