import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {KeyBtnModel} from '../../model/key-btn.model';

@Component({
  selector: 'si-key-btn',
  templateUrl: './key-btn.component.html',
  styleUrls: ['./key-btn.component.css']
})
export class KeyBtnComponent implements OnInit {

  @Input()
  symbol: KeyBtnModel;

  @Output()
  symbolClick: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  handleClick(event: any): void {
    this.symbolClick.emit(this.symbol.value);
  }

}
