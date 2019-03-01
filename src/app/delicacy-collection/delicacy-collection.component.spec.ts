import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelicacyCollectionComponent } from './delicacy-collection.component';

describe('DelicacyCollectionComponent', () => {
  let component: DelicacyCollectionComponent;
  let fixture: ComponentFixture<DelicacyCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelicacyCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelicacyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
