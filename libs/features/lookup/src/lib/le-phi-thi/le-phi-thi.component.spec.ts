import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LePhiThiComponent } from './le-phi-thi.component';

describe('LePhiThiComponent', () => {
  let component: LePhiThiComponent;
  let fixture: ComponentFixture<LePhiThiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LePhiThiComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LePhiThiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
