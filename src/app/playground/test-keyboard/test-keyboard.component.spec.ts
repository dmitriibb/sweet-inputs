import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKeyboardComponent } from './test-keyboard.component';

describe('TestKeyboardComponent', () => {
  let component: TestKeyboardComponent;
  let fixture: ComponentFixture<TestKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
