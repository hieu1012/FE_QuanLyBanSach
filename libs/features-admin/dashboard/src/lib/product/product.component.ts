import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'emi-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  searchValue = '';
  visible = false;

  pageIndex = 1;
  pageSize = 10;

  listOfData: any[] = [
    { name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
    { name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
    { name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
    { name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park' }
  ];

  listOfDisplayData: any[] = []; // Kết quả filter/search
  pageData: any[] = [];         // Kết quả trang hiện tại

  ngOnInit(): void {
    this.listOfDisplayData = [...this.listOfData]; // để filter dùng
    this.updatePageData();
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(item =>
      item.name.toLowerCase().includes(this.searchValue.toLowerCase())
    );
    this.pageIndex = 1;
    this.updatePageData();
  }

  onPageChange(): void {
    this.updatePageData();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageIndex = 1;
    this.updatePageData();
  }

  updatePageData(): void {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = this.pageIndex * this.pageSize;
    this.pageData = this.listOfDisplayData.slice(start, end);
  }
}