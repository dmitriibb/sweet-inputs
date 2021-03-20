import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyLineComponent } from './key-line.component';

describe('KeyLineComponent', () => {
  let component: KeyLineComponent;
  let fixture: ComponentFixture<KeyLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
