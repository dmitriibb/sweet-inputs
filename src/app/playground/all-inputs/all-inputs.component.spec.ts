import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInputsComponent } from './all-inputs.component';

describe('AllInputsComponent', () => {
  let component: AllInputsComponent;
  let fixture: ComponentFixture<AllInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllInputsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
