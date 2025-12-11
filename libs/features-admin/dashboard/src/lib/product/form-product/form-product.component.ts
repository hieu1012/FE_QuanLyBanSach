// // import { Component, Input, OnInit } from '@angular/core';
// // import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// // import { NzModalRef } from 'ng-zorro-antd/modal';
// // import { NzUploadFile } from 'ng-zorro-antd/upload';
// //
// // @Component({
// //   selector: 'emi-form-product',
// //   templateUrl: './form-product.component.html',
// //   styleUrls: ['./form-product.component.scss']
// // })
// // export class FormProductComponent implements OnInit {
// //   @Input() categoryList: any[] = [];
// //   @Input() product?: any; // nếu có thì là edit
// //
// //   productForm!: FormGroup;
// //   fileList: NzUploadFile[] = [];
// //   existingImages: { url: string }[] = []; // ảnh cũ từ server
// //   keepExistingImages = true;
// //   isSubmitting = false;
// //
// //   // Format tiền
// //   formatterVND = (value: number): string => (value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '');
// //   parserVND = (value: string): string => value.replace(/,/g, '');
// //
// //   constructor(
// //     private fb: FormBuilder,
// //     private modal: NzModalRef
// //   ) {}
// //
// //   ngOnInit(): void {
// //     this.productForm = this.fb.group({
// //       title: ['', Validators.required],
// //       description: [''],
// //       categoryId: [null, Validators.required],
// //       price: [null, [Validators.required, Validators.min(1000)]],
// //       discount: [0, [Validators.min(0), Validators.max(100)]],
// //       stock: [0, [Validators.required, Validators.min(0)]],
// //       isActive: [true]
// //     });
// //
// //     // Nếu là edit → điền dữ liệu cũ
// //     if (this.product) {
// //       this.productForm.patchValue({
// //         title: this.product.title,
// //         description: this.product.description || '',
// //         categoryId: this.product.categoryId,
// //         price: this.product.price,
// //         discount: this.product.discount || 0,
// //         stock: this.product.stock,
// //         isActive: this.product.isActive !== false
// //       });
// //
// //       // Lấy danh sách ảnh cũ để hiển thị
// //       this.existingImages = this.product.imageUrls || [];
// //       this.keepExistingImages = true;
// //       console.log('Editing product, existing images:', this.product.imageUrls);
// //     }
// //
// //     // Tự động tính lại giá khi thay đổi
// //     this.productForm.get('price')?.valueChanges.subscribe(() => this.updatePreview());
// //     this.productForm.get('discount')?.valueChanges.subscribe(() => this.updatePreview());
// //   }
// //
// //   // Không upload ngay, chỉ thêm vào danh sách
// //   beforeUpload = (file: NzUploadFile): boolean => {
// //     this.fileList = [...this.fileList, file];
// //     return false;
// //   };
// //
// //   // Xóa ảnh cũ (chỉ đánh dấu, không xóa thật)
// //   removeExistingImage(index: number): void {
// //     this.existingImages.splice(index, 1);
// //     // Nếu người dùng xóa hết ảnh cũ → tự động bỏ tick "giữ ảnh cũ"
// //     if (this.existingImages.length === 0) {
// //       this.keepExistingImages = false;
// //     }
// //   }
// //
// //   // Tính toán giá sau giảm
// //   get discountPercent(): number {
// //     return this.productForm.get('discount')?.value || 0;
// //   }
// //
// //   get originalPrice(): number {
// //     return Number(this.productForm.get('price')?.value) || 0;
// //   }
// //
// //   get discountPrice(): number {
// //     return Math.round(this.originalPrice * (1 - this.discountPercent / 100));
// //   }
// //
// //   get savedAmount(): number {
// //     return this.originalPrice - this.discountPrice;
// //   }
// //
// //   updatePreview() { }
// //
// //   submitForm(): void {
// //     if (this.productForm.invalid) {
// //       Object.values(this.productForm.controls).forEach(c => {
// //         c.markAsDirty();
// //         c.updateValueAndValidity();
// //       });
// //       return;
// //     }
// //
// //     this.isSubmitting = true;
// //
// //     const v = this.productForm.getRawValue();
// //     const price = Number(v.price);
// //     const discountPrice = this.discountPrice;
// //
// //     const formData = new FormData();
// //
// //     // Các field text/number
// //     formData.append('title', (v.title || '').trim());
// //     formData.append('description', (v.description || '').trim());
// //     formData.append('price', price.toString());
// //     formData.append('discountPrice', discountPrice.toString());
// //     formData.append('discount', (v.discount || 0).toString());
// //     formData.append('stock', v.stock.toString());
// //     formData.append('isActive', v.isActive ? 'true' : 'false');
// //     formData.append('categoryId', v.categoryId.toString());
// //
// //     // Nếu là edit → gửi thêm thông tin
// //     if (this.product) {
// //       formData.append('keepExistingImages', this.keepExistingImages.toString());
// //     }
// //
// //     // Gửi ảnh mới (rất quan trọng: dùng originFileObj)
// //     this.fileList.forEach((file: any) => {
// //       formData.append('images', file.originFileObj || file);
// //     });
// //
// //     // console.log('Gửi FormData lên backend:', [...formData.keys()]);
// //
// //     this.modal.close(formData);
// //   }
// //
// //   cancel(): void {
// //     this.modal.close(null);
// //   }
// // }
//
//
// import { Component, Input, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NzModalRef } from 'ng-zorro-antd/modal';
// import { NzUploadFile } from 'ng-zorro-antd/upload';
//
// @Component({
//   selector: 'emi-form-product',
//   templateUrl: './form-product.component.html',
//   styleUrls: ['./form-product.component.scss']   // dùng .scss (bạn đã đổi rồi)
// })
// export class FormProductComponent implements OnInit {
//   @Input() categoryList: any[] = [];
//   @Input() product?: any; // nếu có → đang edit
//
//   productForm!: FormGroup;
//   fileList: NzUploadFile[] = [];
//
//   // Ảnh cũ từ server – backend trả về mảng string
//   existingImages: string[] = [];
//
//   keepExistingImages = true;
//   isSubmitting = false;
//
//   // Format tiền VND
//   formatterVND = (value: number): string =>
//     value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
//   parserVND = (value: string): string => value.replace(/,/g, '');
//
//   constructor(
//     private fb: FormBuilder,
//     private modal: NzModalRef
//   ) {}
//
//   ngOnInit(): void {
//     this.productForm = this.fb.group({
//       title: ['', Validators.required],
//       description: [''],
//       categoryId: [null, Validators.required],
//       price: [null, [Validators.required, Validators.min(1000)]],
//       discount: [0, [Validators.min(0), Validators.max(100)]],
//       stock: [0, [Validators.required, Validators.min(0)]],
//       isActive: [true]
//     });
//
//     if (this.product) {
//       this.productForm.patchValue({
//         title: this.product.title,
//         description: this.product.description || '',
//         categoryId: this.product.categoryId,
//         price: this.product.price,
//         discount: this.product.discount || 0,
//         stock: this.product.stock,
//         isActive: this.product.isActive !== false
//       });
//
//       // Lấy mảng string ảnh cũ (imageUrls hoặc images)
//       this.existingImages = this.product.imageUrls || this.product.images || [];
//       this.keepExistingImages = true;
//
//       console.log('Editing product, existing images:', this.existingImages);
//     }
//
//     // Tự động tính lại giá khi thay đổi
//     this.productForm.get('price')?.valueChanges.subscribe(() => this.updatePreview());
//     this.productForm.get('discount')?.valueChanges.subscribe(() => this.updatePreview());
//   }
//
//   // Không tự upload, chỉ thêm vào danh sách
//   beforeUpload = (file: NzUploadFile): boolean => {
//     this.fileList = [...this.fileList, file];
//     return false; // ngăn upload tự động
//   };
//
//   // Xóa ảnh cũ (chỉ xóa khỏi UI, backend sẽ quyết định dựa vào keepExistingImages)
//   removeExistingImage(index: number): void {
//     this.existingImages.splice(index, 1);
//     if (this.existingImages.length === 0) {
//       this.keepExistingImages = false;
//     }
//   }
//
//   // Tính giá sau giảm
//   get discountPercent(): number {
//     return this.productForm.get('discount')?.value || 0;
//   }
//
//   get originalPrice(): number {
//     return Number(this.productForm.get('price')?.value) || 0;
//   }
//
//   get discountPrice(): number {
//     return Math.round(this.originalPrice * (1 - this.discountPercent / 100));
//   }
//
//   get savedAmount(): number {
//     return this.originalPrice - this.discountPrice;
//   }
//
//   updatePreview(): void {
//     // trigger change detection
//   }
//
//   submitForm(): void {
//     if (this.productForm.invalid) {
//       Object.values(this.productForm.controls).forEach(c => {
//         c.markAsDirty();
//         c.updateValueAndValidity();
//       });
//       return;
//     }
//
//     this.isSubmitting = true;
//
//     const v = this.productForm.getRawValue();
//     const price = Number(v.price);
//     const discountPrice = this.discountPrice;
//
//     const formData = new FormData();
//
//     formData.append('title', (v.title || '').trim());
//     formData.append('description', (v.description || '').trim());
//     formData.append('price', price.toString());
//     formData.append('discountPrice', discountPrice.toString());
//     formData.append('discount', (v.discount || 0).toString());
//     formData.append('stock', v.stock.toString());
//     formData.append('isActive', v.isActive ? 'true' : 'false');
//     formData.append('categoryId', v.categoryId.toString());
//
//     // Nếu là edit → gửi thêm keepExistingImages
//     if (this.product) {
//       formData.append('keepExistingImages', this.keepExistingImages.toString());
//     }
//
//     // Gửi ảnh mới
//     this.fileList.forEach((file: any) => {
//       formData.append('images', file.originFileObj || file);
//     });
//
//     // Debug (bỏ comment khi cần)
//     // for (let [key, value] of formData.entries() ) {
//     //   console.log(key, value);
//     // }
//
//     this.modal.close(formData);
//   }
//
//   cancel(): void {
//     this.modal.close(null);
//   }
// }


import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'emi-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {
  @Input() categoryList: any[] = [];
  @Input() product?: any; // nếu có → đang edit

  productForm!: FormGroup;
  fileList: NzUploadFile[] = [];

  // Ảnh cũ từ server – backend trả về mảng string
  existingImages: string[] = [];

  keepExistingImages = true;
  isSubmitting = false;

  // Format tiền VND
  formatterVND = (value: number): string =>
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
      price: [null, [Validators.required, Validators.min(1000)]],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      isActive: [true]
    });

    if (this.product) {
      this.productForm.patchValue({
        title: this.product.title,
        description: this.product.description || '',
        categoryId: this.product.categoryId,
        price: this.product.price,
        discount: this.product.discount || 0,
        stock: this.product.stock,
        isActive: this.product.isActive
      });

      // Lấy danh sách ảnh cũ (mảng string)
      this.existingImages = this.product.imageUrls || this.product.images || [];
      this.keepExistingImages = true;

      console.log('Đang sửa sản phẩm ID:', this.product.id);
      console.log('Ảnh hiện tại:', this.existingImages);
    }

    // Tự động cập nhật preview giá khi thay đổi
    this.productForm.get('price')?.valueChanges.subscribe(() => this.updatePreview());
    this.productForm.get('discount')?.valueChanges.subscribe(() => this.updatePreview());
  }

  // Ngăn upload tự động, chỉ thêm vào danh sách
  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = [...this.fileList, file];
    return false;
  };

  // Xóa ảnh cũ khỏi UI (backend sẽ xử lý theo keepExistingImages)
  removeExistingImage(index: number): void {
    this.existingImages.splice(index, 1);
    if (this.existingImages.length === 0) {
      this.keepExistingImages = false;
    }
  }

  // Tính toán giá sau giảm
  get discountPercent(): number {
    return this.productForm.get('discount')?.value || 0;
  }

  get originalPrice(): number {
    return Number(this.productForm.get('price')?.value) || 0;
  }

  get discountPrice(): number {
    return Math.round(this.originalPrice * (1 - this.discountPercent / 100));
  }

  get savedAmount(): number {
    return this.originalPrice - this.discountPrice;
  }

  updatePreview(): void {
    // trigger change detection
  }

  submitForm(): void {
    // Validate form
    if (this.productForm.invalid) {
      Object.values(this.productForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }

    this.isSubmitting = true;

    const v = this.productForm.getRawValue();
    const price = Number(v.price);
    const discountPrice = this.discountPrice;

    const formData = new FormData();

    // === Các field bắt buộc ===
    formData.append('title', (v.title || '').trim());
    formData.append('description', (v.description || '').trim());
    formData.append('price', price.toString());
    formData.append('discountPrice', discountPrice.toString());
    formData.append('discount', (v.discount || 0).toString());
    formData.append('stock', v.stock.toString());
    formData.append('isActive', v.isActive ? 'true' : 'false');
    formData.append('categoryId', v.categoryId.toString());

    // === QUAN TRỌNG: Khi cập nhật → phải gửi ID vào form-data
    if (this.product?.id) {
      formData.append('id', this.product.id.toString());
    }

    // Gửi trạng thái giữ ảnh cũ (luôn gửi, cả khi thêm mới cũng được)
    formData.append('keepExistingImages', this.keepExistingImages.toString());

    // Gửi ảnh mới
    this.fileList.forEach((file: any) => {
      const fileObj = file.originFileObj || file;
      if (fileObj) {
        formData.append('images', fileObj);
      }
    });

    // Debug (bỏ comment khi cần kiểm tra)
    // console.log('FormData keys:', [...formData.keys()]);
    // for (let [k, v] of formData.entries()) {
    //   console.log(k, v);
    // }

    // Đóng modal và trả về FormData
    this.modal.close(formData);
  }

  cancel(): void {
    this.modal.close(null);
  }
}
