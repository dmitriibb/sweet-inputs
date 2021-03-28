import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderContextMenuComponent } from './slider-context-menu.component';

describe('SliderContextMenuComponent', () => {
  let component: SliderContextMenuComponent;
  let fixture: ComponentFixture<SliderContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderContextMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
