import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedioDetailComponent } from './vedio-detail.component';

describe('VedioDetailComponent', () => {
  let component: VedioDetailComponent;
  let fixture: ComponentFixture<VedioDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedioDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
