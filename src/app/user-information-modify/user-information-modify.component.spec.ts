import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInformationModifyComponent } from './user-information-modify.component';

describe('UserInformationModifyComponent', () => {
  let component: UserInformationModifyComponent;
  let fixture: ComponentFixture<UserInformationModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInformationModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInformationModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
