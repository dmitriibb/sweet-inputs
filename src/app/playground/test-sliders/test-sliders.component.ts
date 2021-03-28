import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'si-test-sliders',
  templateUrl: './test-sliders.component.html',
  styleUrls: ['./test-sliders.component.css']
})
export class TestSlidersComponent implements OnInit {

  constructor() { }

  value = 25;

  ngOnInit(): void {
  }

  sliderValueChanged(event) {
    this.value = event;
  }

}
