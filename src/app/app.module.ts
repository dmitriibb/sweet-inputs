import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KeyBtnComponent } from './inputs/keyboard/components/key-btn/key-btn.component';
import { KeyLineComponent } from './inputs/keyboard/components/key-line/key-line.component';
import { KeyboardComponent } from './inputs/keyboard/components/keyboard/keyboard.component';
import { TestKeyboardComponent } from './playground/test-keyboard/test-keyboard.component';
import { AllInputsComponent } from './playground/all-inputs/all-inputs.component';
import { SimpleSliderComponent } from './inputs/slider/simple-slider/simple-slider.component';
import { TestSlidersComponent } from './playground/test-sliders/test-sliders.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SliderContextMenuComponent } from './inputs/slider/slider-context-menu/slider-context-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    KeyBtnComponent,
    KeyLineComponent,
    KeyboardComponent,
    TestKeyboardComponent,
    AllInputsComponent,
    SimpleSliderComponent,
    TestSlidersComponent,
    SliderContextMenuComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
