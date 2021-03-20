import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSlidersComponent } from './test-sliders.component';

describe('TestSlidersComponent', () => {
  let component: TestSlidersComponent;
  let fixture: ComponentFixture<TestSlidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSlidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSlidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
