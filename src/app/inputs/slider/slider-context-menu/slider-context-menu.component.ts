import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'si-slider-context-menu',
  templateUrl: './slider-context-menu.component.html',
  styleUrls: ['./slider-context-menu.component.css']
})
export class SliderContextMenuComponent implements OnInit {

  @Output() optionSelected = new EventEmitter<string>();

  constructor() { }

  options = [];

  ngOnInit(): void {
    this.initOptions();
  }

  private initOptions() {
    this.options.push('Add');
    this.options.push('Remove');
  }

  optionClick(option) {
    this.optionSelected.emit(option);
  }

}
