import { Component, OnInit } from '@angular/core';
import {KEYBOARD_TAB, SLIDER_TAB, TABS} from '../constants';

@Component({
  selector: 'si-all-inputs',
  templateUrl: './all-inputs.component.html',
  styleUrls: ['./all-inputs.component.css']
})
export class AllInputsComponent implements OnInit {

  keyboardTab = KEYBOARD_TAB;
  sliderTab = SLIDER_TAB

  tabs = TABS;
  currentTab: string;

  constructor() { }

  ngOnInit(): void {
    this.currentTab = KEYBOARD_TAB;
  }

  tabClick(tabName) {
    this.currentTab = tabName;
  }

}
