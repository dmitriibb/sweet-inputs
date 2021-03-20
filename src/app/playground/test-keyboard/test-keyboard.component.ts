import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'si-test-keyboard',
  templateUrl: './test-keyboard.component.html',
  styleUrls: ['./test-keyboard.component.css']
})
export class TestKeyboardComponent implements OnInit {

  input: string;

  constructor() { }

  ngOnInit(): void {
    this.input = '';
  }

  symbolClickKeyboard(symbol): void {
    this.input += symbol;
  }

  backSpaceClick(): void {
    if (this.input !== '')
      this.input = this.input.substring(0, this.input.length - 1);
  }

  clearClickKeyboard(): void {
    this.input = '';
  }

}
