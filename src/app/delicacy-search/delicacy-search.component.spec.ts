import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelicacySearchComponent } from './delicacy-search.component';

describe('DelicacySearchComponent', () => {
  let component: DelicacySearchComponent;
  let fixture: ComponentFixture<DelicacySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelicacySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelicacySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
