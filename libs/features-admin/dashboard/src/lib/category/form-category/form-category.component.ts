import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'emi-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss'],
})
export class FormCategoryComponent implements OnInit {
  @Input() category?: any;
  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['']
    });
    if (this.category) {
      this.categoryForm.patchValue({
        name: this.category.name,
        description: this.category.description
      });
    }
  }

  submitForm(): void {
    if (this.categoryForm.invalid) {
      Object.values(this.categoryForm.controls).forEach(c => c.markAsDirty());
      return;
    }
    const formValue = this.categoryForm.getRawValue();
    this.modal.close(formValue);
  }

  cancel(): void {
    this.modal.close(null);
  }
}
