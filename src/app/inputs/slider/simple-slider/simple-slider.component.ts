import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'si-simple-slider',
  templateUrl: './simple-slider.component.html',
  styleUrls: ['./simple-slider.component.css']
})
export class SimpleSliderComponent implements OnInit {

  @Input() min: number;
  @Input() max: number;
  @Input() value: number;

  @ViewChild('slider')
  slider: ElementRef;

  cursorMarginLeft: string;
  sizePixels: number;

  private cursorGrubbed = false;

  constructor() { }

  ngOnInit(): void {
    if (this.min === undefined || this.min === null)
      this.min = 0;

    if (this.max === undefined || this.max === null)
      this.max = 100;

    if (this.value === undefined || this.value === null)
      this.value = 50;

    this.setCursorPosition();


  }

  public setCursorPosition() {
    this.cursorMarginLeft = `${this.getCursorPositionPercent()}%`;
  }

  private getCursorPositionPercent() {
    return this.value / (this.max - this.min) * 100;
  }

  private setSliderSize() {
    if (this.sizePixels === undefined || this.sizePixels === null)
      this.sizePixels = this.slider.nativeElement.getBoundingClientRect().width;
  }

  grabCursor() {
    this.setSliderSize();
    this.cursorGrubbed = true;
  }

  releaseCursor() {
    this.cursorGrubbed = false;
  }

  mousemove(event) {
    //console.log(event);
    this.moveCursor(event);
  }

  private moveCursor(event) {
    if (!this.cursorGrubbed || event.offsetX <= 5)
      return;
    const nextPosition = event.offsetX / this.sizePixels * 100;
    //console.log(nextPosition);
    this.cursorMarginLeft = `${nextPosition}%`;
  }



}
