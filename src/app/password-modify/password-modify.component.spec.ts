import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordModifyComponent } from './password-modify.component';

describe('PasswordModifyComponent', () => {
  let component: PasswordModifyComponent;
  let fixture: ComponentFixture<PasswordModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
