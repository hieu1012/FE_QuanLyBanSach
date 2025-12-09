import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhMucSachComponent } from './danh-muc-sach.component';

describe('DanhMucSachComponent', () => {
  let component: DanhMucSachComponent;
  let fixture: ComponentFixture<DanhMucSachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DanhMucSachComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucSachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
