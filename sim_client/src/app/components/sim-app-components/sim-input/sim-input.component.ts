import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sim-input',
  templateUrl: './sim-input.component.html',
  styleUrls: ['./sim-input.component.css']
})
export class SimInputComponent {
  @Input() type: string;
  @Input() value: any;
  @Input() label: string; 
  @Input() options: any;

  @Output() valueChange = new EventEmitter<any>();

  constructor() { }

  getExactValue(value, type) {
    switch(type) {
      case 'number':
        return +value;
      default:
        return value;
    }
  }

  isSlider() {
    return this.type == "slider";
  }

  isToggle() {
    return this.type == 'toggle';
  }

  isInputBox() {
    return this.type == 'input-box';
  }

  isClassicInputBox() {
    return this.type == 'classic-input-box';
  }

  isDropdown() {
    return this.type == 'dropdown';
  }
}
