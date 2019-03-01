import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelicacyRemarkComponent } from './delicacy-remark.component';

describe('DelicacyRemarkComponent', () => {
  let component: DelicacyRemarkComponent;
  let fixture: ComponentFixture<DelicacyRemarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelicacyRemarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelicacyRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
