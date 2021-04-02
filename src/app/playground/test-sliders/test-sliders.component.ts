import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'si-test-sliders',
  templateUrl: './test-sliders.component.html',
  styleUrls: ['./test-sliders.component.css']
})
export class TestSlidersComponent implements OnInit {

  constructor() { }

  value = 25;

  multiValues = [];

  rangeFrom = 50;
  rangeTo = 70

  ngOnInit(): void {
  }

  sliderValueChanged(event) {
    this.value = event;
  }

  sliderValuesChangedMulti(event) {
    this.multiValues = event;
  }

  sliderValuesChangedRange(event) {
    this.rangeFrom = event[0];
    this.rangeTo = event[1];
  }

}
