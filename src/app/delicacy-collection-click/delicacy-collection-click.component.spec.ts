import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelicacyCollectionClickComponent } from './delicacy-collection-click.component';

describe('DelicacyCollectionClickComponent', () => {
  let component: DelicacyCollectionClickComponent;
  let fixture: ComponentFixture<DelicacyCollectionClickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelicacyCollectionClickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelicacyCollectionClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
