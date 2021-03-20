import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyBtnComponent } from './key-btn.component';

describe('KeyBtnComponent', () => {
  let component: KeyBtnComponent;
  let fixture: ComponentFixture<KeyBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
