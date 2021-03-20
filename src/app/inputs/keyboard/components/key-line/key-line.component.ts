import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {KeyBtnModel} from '../../model/key-btn.model';

@Component({
  selector: 'si-key-line',
  templateUrl: './key-line.component.html',
  styleUrls: ['./key-line.component.css']
})
export class KeyLineComponent implements OnInit {

  @Input()
  symbols: KeyBtnModel[];

  @Output()
  symbolClickLine: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    console.log("line--");
  }

  symbolClick(symbol: string): void {
    this.symbolClickLine.emit(symbol);
  }

}
