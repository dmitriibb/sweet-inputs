import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SliderCursor} from '../model/slider-cursor.model';

@Component({
  selector: 'si-simple-slider',
  templateUrl: './simple-slider.component.html',
  styleUrls: ['./simple-slider.component.css']
})
export class SimpleSliderComponent implements OnInit {

  @Input() min: number;
  @Input() max: number;
  @Input() inputValues: number[];
  @Input() inputValue: number;
  @Input() singleSlider = true;

  @Input() displayMin = true;
  @Input() displayMax = true;

  @Output() onValueChanged: EventEmitter<number> = new EventEmitter<number>();

  values: SliderCursor[];

  @ViewChild('sliderContainer')
  slider: ElementRef;

  sliderSizePx: number;

  private cursorGrubbed = false;
  public currentCursorId: number;

  private prevMousePosition: number;
  private displayContextMenuTimer;

  constructor() { }

  ngOnInit(): void {
    if (this.min === undefined || this.min === null)
      this.min = 0;

    if (this.max === undefined || this.max === null)
      this.max = 100;

    this.values = [];

    if (!this.values.length) {
      const cursor = new SliderCursor();
      cursor.id = 0;
      const value = this.inputValue !== undefined && this.inputValue !== null
        ? this.inputValue
        : (this.max - this.min) / 2 + this.min
      cursor.value = value;
      this.values.push(cursor);
    }

    document.addEventListener('mouseup', e => this.releaseCursor());
    document.addEventListener('mousemove', e => this.mouseMove(e));
    document.addEventListener('mousemove', e => this.mouseMove(e));

    setTimeout(() => this.initState(), 100);
  }

  private initState() {
    if (this.sliderSizePx === undefined || this.sliderSizePx === null)
      this.sliderSizePx = this.slider.nativeElement.getBoundingClientRect().width;

    this.setPositionsByValue();
  }

  private setPositionsByValue() {
    for (let i = 0; i < this.values.length; i++) {
      this.currentCursorId = i;
      this.setPositionByValue();
    }
  }

  public setPositionByValue() {
    const cursor = this.values[this.currentCursorId];
    const position = cursor.value / (this.max - this.min);
    cursor.positionPx = position * this.sliderSizePx;
    cursor.positionPercent = `${position * 100}%`;
  }

  public setPositionByPx() {
    const cursor = this.values[this.currentCursorId];
    const position = cursor.positionPx / this.sliderSizePx;
    cursor.value = this.min + (this.max - this.min) * position;
    cursor.positionPercent = `${position * 100}%`;
  }

  onCursorMouseDown(event, cursorId: number) {
    if (event.button === 0)
      this.grabCursor(event, cursorId);
    else if (event.button === 2)
      this.displayContextMenuTimer = setTimeout(() => {
        const cursor = this.values[cursorId].displayContextMenu = true;
      }, 1000);
  }

  onCursorContextMenu(event) {
    event.preventDefault();
  }

  grabCursor(event, cursorId: number) {
    this.cursorGrubbed = true;
    this.currentCursorId = cursorId;
    this.prevMousePosition = event.x;
  }

  releaseCursor() {
    clearTimeout(this.displayContextMenuTimer);
    const cursor = this.values[this.currentCursorId];
    console.log(cursor.value);
    this.cursorGrubbed = false;
    this.valueChanged();
  }

  private mouseMove(event) {
    if (!this.cursorGrubbed)
      return;

    const cursor = this.values[this.currentCursorId];

    const offset = event.x - this.prevMousePosition;
    this.prevMousePosition = event.x;
    let newPositionPx = cursor.positionPx + offset;

    if (newPositionPx < 0)
      newPositionPx = 0;

    if (newPositionPx > this.sliderSizePx)
      newPositionPx = this.sliderSizePx;

    cursor.positionPx = newPositionPx;

    this.setPositionByPx();
  }

  private valueChanged() {
    this.onValueChanged.emit(this.values[this.currentCursorId].value);
  }

  contextOptionSelected(optionName, cursorId: number) {
    const cursor = this.values[cursorId];
    cursor.displayContextMenu = false;

    if (optionName === 'Add')
      this.addCursor();

    if (optionName === 'Remove' && this.values.length)
      this.values.splice(cursorId, 1);

  }

  private addCursor() {
    const cursor = new SliderCursor();
    cursor.id = this.values.length;
    cursor.value = (this.max - this.min) / 2 + this.min;
    this.values.push(cursor);
    this.currentCursorId = cursor.id;
    this.setPositionByValue();
  }


}
