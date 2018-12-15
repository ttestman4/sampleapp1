import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureStoreComponent } from './feature-store.component';

describe('FeatureStoreComponent', () => {
  let component: FeatureStoreComponent;
  let fixture: ComponentFixture<FeatureStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
