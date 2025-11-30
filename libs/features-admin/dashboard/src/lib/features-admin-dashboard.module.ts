import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { OrderComponent } from './order/order.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    NzLayoutModule,
    NzIconModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzBadgeModule,
    NzAvatarModule,
    NzTableModule,
    NzTagModule,
    NzButtonModule,
    NzDividerModule,
    GridModule,
    ButtonsModule,
    InputsModule,
    LabelModule,
    DropDownsModule,
    NzPaginationModule,
    NzDropDownModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          { path: 'users', component: UserComponent, data: { title: 'Người dùng' } },
          { path: 'products', component: ProductComponent, data: { title: 'Sản phẩm' } },
          { path: 'orders', component: OrderComponent, data: { title: 'Đơn hàng' } },
        ]
      }
    ]),
  ],
  declarations: [
    DashboardComponent,
    ProductComponent,
    UserComponent,
    OrderComponent,
  ],
})
export class FeaturesAdminDashboardModule { }
