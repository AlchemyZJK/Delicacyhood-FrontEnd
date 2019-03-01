import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelicacyComponent } from './delicacy.component';

describe('DelicacyComponent', () => {
  let component: DelicacyComponent;
  let fixture: ComponentFixture<DelicacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelicacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelicacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
