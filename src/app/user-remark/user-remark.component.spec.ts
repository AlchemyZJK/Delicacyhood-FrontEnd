import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRemarkComponent } from './user-remark.component';

describe('UserRemarkComponent', () => {
  let component: UserRemarkComponent;
  let fixture: ComponentFixture<UserRemarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRemarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
