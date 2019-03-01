import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictxtDetailComponent } from './pictxt-detail.component';

describe('PictxtDetailComponent', () => {
  let component: PictxtDetailComponent;
  let fixture: ComponentFixture<PictxtDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictxtDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictxtDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
