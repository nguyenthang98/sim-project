import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sim-color-picker',
  templateUrl: './sim-color-picker.component.html',
  styleUrls: ['./sim-color-picker.component.css']
})
export class SimColorPickerComponent {
  showDialog: boolean;

  @Input() label: string;
  @Input() color: string;
  @Output() colorChange = new EventEmitter<string>();

  constructor() { 
    this.showDialog = false;
  }
}
