import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonFunctionalComponent } from './non-functional.component';

describe('NonFunctionalComponent', () => {
  let component: NonFunctionalComponent;
  let fixture: ComponentFixture<NonFunctionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonFunctionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonFunctionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
