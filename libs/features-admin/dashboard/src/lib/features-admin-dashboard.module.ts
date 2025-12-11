import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { OrderComponent } from './order/order.component';

// Ng Zorro Antd
import { SwiperModule } from 'swiper/angular';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSpinModule } from 'ng-zorro-antd/spin';
// Kendo UI
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NzMessageModule } from 'ng-zorro-antd/message';
// Angular forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Import array icon đã export riêng
import { antDesignIcons } from './ant-design-icons';
import { FormProductComponent } from './product/form-product/form-product.component';
import { FormUserComponent } from './user/form-user/form-user.component';
import { CategoryComponent } from './category/category.component';
import { FormCategoryComponent } from './category/form-category/form-category.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormChangePasswordComponent } from './user/form-change-password/form-change-password.component'; // điều chỉnh lại path đúng nếu để thư mục khác

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: 'users',
            component: UserComponent,
            data: { title: 'Người dùng' },
          },
          {
            path: 'products',
            component: ProductComponent,
            data: { title: 'Sản phẩm' },
          },
          {
            path: 'categories',
            component: CategoryComponent,
            data: { title: 'Loại sản phẩm' },
          },
          {
            path: 'orders',
            component: OrderComponent,
            data: { title: 'Đơn hàng' },
          },
        ],
      },
    ]),

    // Ng Zorro modules
    SwiperModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzBadgeModule,
    NzAvatarModule,
    NzTableModule,
    NzTagModule,
    NzButtonModule,
    NzDividerModule,
    NzPaginationModule,
    NzDropDownModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    NzIconModule,
    NzModalModule,
    NzCheckboxModule,
    NzInputNumberModule,
    NzNotificationModule,
    // Kendo modules
    GridModule,
    ButtonsModule,
    InputsModule,
    LabelModule,
    DropDownsModule,
    NzDatePickerModule,
    NzUploadModule,
    NzSpinModule,
    NzMessageModule
  ],
  declarations: [
    DashboardComponent,
    ProductComponent,
    UserComponent,
    OrderComponent,
    FormProductComponent,
    FormUserComponent,
    CategoryComponent,
    FormCategoryComponent,
    FormChangePasswordComponent,
  ],
  providers: [{ provide: NZ_ICONS, useValue: antDesignIcons }],
})
export class FeaturesAdminDashboardModule {}
