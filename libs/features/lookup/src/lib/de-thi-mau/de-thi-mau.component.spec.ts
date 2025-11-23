import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeThiMauComponent } from './de-thi-mau.component';

describe('DeThiMauComponent', () => {
  let component: DeThiMauComponent;
  let fixture: ComponentFixture<DeThiMauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeThiMauComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeThiMauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
