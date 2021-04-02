import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SliderCursor} from '../model/slider-cursor.model';
import {SLIDER_TYPE_MULTI, SLIDER_TYPE_RANGE, SLIDER_TYPE_SINGLE} from '../constants';

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

  @Input() sliderType = SLIDER_TYPE_SINGLE;

  @Output() onValuesChanged: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() onValuesChanging: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() onValueChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() onValueChanging: EventEmitter<number> = new EventEmitter<number>();

  values: SliderCursor[];

  @ViewChild('sliderContainer')
  slider: ElementRef;

  sliderSizePx: number;
  rangeLeftPositionPx: string;
  rangeWidthPx: string

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

    if (this.min === this.max)
      this.max++;

    if (this.min >= this.max)
      this.max = this.min - this.max;

    this.initValues();

    document.addEventListener('mouseup', e => this.releaseCursor());
    document.addEventListener('mousemove', e => this.mouseMove(e));

    setTimeout(() => this.initState(), 100);
  }

  private initValues() {
    this.values = [];

    if (this.sliderType === SLIDER_TYPE_SINGLE) {
      if (this.inputValue === undefined || this.inputValue === null)
        this.inputValues = [(this.max - this.min) / 2 + this.min];
      else
        this.inputValues = [this.inputValue];
    }

    if (this.sliderType === SLIDER_TYPE_MULTI) {
      if (!this.inputValues || !this.inputValues.length)
        this.inputValues = [(this.max - this.min) / 2 + this.min];
    }

    if (this.sliderType === SLIDER_TYPE_RANGE) {
      if (!this.inputValues || !this.inputValues.length)
        this.inputValues = [this.min, this.max];
      else if (this.inputValues.length === 1)
        this.inputValues = [this.inputValues[0], this.max];
      else if (this.inputValues.length > 2)
        this.inputValues = [this.inputValues[0], this.inputValues[1]];
    }

    this.inputValues.forEach((iv, index) => {
      const cursor = new SliderCursor();
      cursor.id = index;
      cursor.value = iv;

      if (cursor.value < this.min)
        cursor.value = this.min;
      if (cursor.value > this.max)
        cursor.value = this.max

      this.values.push(cursor);
    });
  }

  private initState() {
    if (this.sliderSizePx === undefined || this.sliderSizePx === null)
      this.sliderSizePx = this.slider.nativeElement.getBoundingClientRect().width;

    for (let i = 0; i < this.values.length; i++) {
      this.currentCursorId = i;
      this.setPositionByValue();
    }
    this.setRangePositions();
  }

  private setPositionByValue() {
    const cursor = this.values[this.currentCursorId];
    const position = cursor.value / (this.max - this.min);
    cursor.positionPx = position * this.sliderSizePx;
    cursor.positionPercent = `${position * 100}%`;
  }

  private setPositionByPx() {
    const cursor = this.values[this.currentCursorId];
    const position = cursor.positionPx / this.sliderSizePx;
    cursor.value = this.min + (this.max - this.min) * position;
    cursor.positionPercent = `${position * 100}%`;
    this.setRangePositions();
  }

  private setRangePositions() {
    if (this.sliderType !== SLIDER_TYPE_RANGE) return;
    const min = Math.min(this.values[0].positionPx, this.values[1].positionPx);
    const max = Math.max(this.values[0].positionPx, this.values[1].positionPx);
    const width = max - min;
    this.rangeLeftPositionPx = `${min}px`;
    this.rangeWidthPx = `${width}px`;
  }

  onCursorMouseDown(event, cursorId: number) {
    if (event.button === 0)
      this.grabCursor(event, cursorId);
    else if (event.button === 2)
      this.displayContextMenu(cursorId);
  }

  private displayContextMenu(cursorId: number) {
    if (this.sliderType === SLIDER_TYPE_MULTI)
      this.displayContextMenuTimer = setTimeout(() => {
        this.values[cursorId].displayContextMenu = true;
      }, 500);
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
    if (!this.cursorGrubbed) return;
    clearTimeout(this.displayContextMenuTimer);
    this.cursorGrubbed = false;
    this.valuesChanged();
    this.valueChanged()
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
    this.valuesChanging();
    this.valueChanging();
  }

  private valuesChanged() {
    const res = this.values.map(v => v.value);
    this.onValuesChanged.emit(res);
  }

  private valueChanged() {
    this.onValueChanged.emit(this.values[this.currentCursorId].value);
  }

  private valuesChanging() {
    const res = this.values.map(v => v.value);
    this.onValuesChanged.emit(res);
  }

  private valueChanging() {
    this.onValueChanged.emit(this.values[this.currentCursorId].value);
  }

  contextOptionSelected(optionName, cursorId: number) {
    const cursor = this.values[cursorId];
    cursor.displayContextMenu = false;

    if (optionName === 'Add')
      this.addCursor();

    if (optionName === 'Remove' && this.values.length) {
      this.values.splice(cursorId, 1);
      for (let i = 0; i < this.values.length; i++) {
        this.values[i].id = i;
      }
      this.valuesChanged();
    }
  }

  private addCursor() {
    const cursor = new SliderCursor();
    cursor.id = this.values.length;
    cursor.value = (this.max - this.min) / 2 + this.min;
    this.values.push(cursor);
    this.currentCursorId = cursor.id;
    this.setPositionByValue();
    this.valuesChanged();
  }


}
