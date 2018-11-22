import { Component, Input, Output,  EventEmitter, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import { Filters } from "konva";

@Component({
  selector: 'sim-filter',
  templateUrl: './sim-filter.component.html',
  styleUrls: ['./sim-filter.component.css']
})
export class SimFilterComponent implements OnChanges{
  @Input() filterTarget: any;
  @Output() filterChange = new EventEmitter<any[]>();

  ngOnChanges(changes: SimpleChanges): void {
    this.filterTarget.filters(this.getFilterClasses());
  }

  constructor() {
  }

  getFilters() {
    return filterFeature;
  }

  getFilterClasses() {
    return filterFeature.map(filterConfig => Filters[filterConfig.name]);
  }
}

const filterFeature = [
  {
    name: "Blur",
    valueFunc: "blurRadius",
    inputType: "slider",
    options: {
      min: 0,
      max: 40,
      step: 1,
      showInputBox: true
    }
  }, {
    name: "Brighten",
    valueFunc: "brightness",
    inputType: "slider",
    options: {
      min: -1,
      max: 1,
      step: 0.01,
      showInputBox: true
    }
  }, {
    name: "Contrast",
    valueFunc: "contrast",
    inputType: 'slider',
    options: {
      min: -100,
      max: 100,
      step: 0.5,
      showInputBox: true
    }
  }
]