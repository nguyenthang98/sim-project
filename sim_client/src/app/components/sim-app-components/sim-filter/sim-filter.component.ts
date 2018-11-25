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
    // this.filterTarget.filters(this.getFilterClasses());
  }

  constructor() {
  }

  getFilters() {
    return [...singleInputFilters, ...multipleInputFilters, ...toggleFilters];
  }

  findFilterIndex(filter) {
    const _filters = this.filterTarget.filters() || [];
    if (_filters.length) {
      const _filterIdx = _filters.findIndex(filterClass => filterClass == Filters[filter.name]);
      return _filterIdx;
    }
    return -1;
  }

  hasFilter(filter) {
    return this.findFilterIndex(filter) == -1 ? false : true;
  }

  applyFilter(filter, newValue, options) {
    if(filter.type == 'single-input') {
      // single input value
      if(options && options.useFilter) {
        this.addFilter(filter);
      } else if(options && !options.useFilter) {
        this.removeFilter(filter);
      } else {
        this.filterTarget[filter.valueFunc](newValue);
      }
    } else if(filter.type == 'toggle-input') {
      //toggle filters
      if(newValue) {
        this.addFilter(filter);
      } else {
        this.removeFilter(filter);
      }
    } else if(filter.type == 'multiple-input') {
      // multiple input filters
      if(options) {
        this.filterTarget[options.valueFunc](newValue);
        this.addFilter(filter);
      } else {
        if(newValue) this.addFilter(filter);
        else this.removeFilter(filter);
      }
    }
    this.reDrawTarget();
  }

  reDrawTarget() {
    this.filterTarget.cache();
    this.filterTarget.getLayer().batchDraw();
  }

  addFilter(filter) {
    if(!this.hasFilter(filter)) {
      const lastFilters = this.filterTarget.filters() || [];
      this.filterTarget.filters([...lastFilters, Filters[filter.name]])
    }
  }

  removeFilter(filter) {
    const filterIdx = this.findFilterIndex(filter);
    if(filterIdx >= 0) {
      let _filters = this.filterTarget.filters(); 
      _filters.splice(filterIdx, 1);
      this.filterTarget.filters(_filters);
    }
  }
}

const singleInputFilters = [
  {
    name: "Blur",
    type: 'single-input',
    valueFunc: "blurRadius",
    inputType: "slider",
    options: {
      min: 0,
      max: 40,
      step: 1,
      defaultValue: 0,
      showInputBox: true,
      thumbLabel: true
    }
  }, {
    name: "Brighten",
    type: 'single-input',
    valueFunc: "brightness",
    inputType: "slider",
    options: {
      min: -1,
      max: 1,
      step: 0.01,
      defaultValue: 0,
      showInputBox: true,
      thumbLabel: true
    }
  }, {
    name: "Contrast",
    type: 'single-input',
    valueFunc: "contrast",
    inputType: 'slider',
    options: {
      min: -100,
      max: 100,
      step: 0.5,
      defaultValue: 0,
      showInputBox: true,
      thumbLabel: true
    }
  }, {
    name: "Enhance",
    type: 'single-input',
    valueFunc: "enhance",
    inputType: 'slider',
    options: {
      min: -1,
      max: 1,
      step: 0.05,
      defaultValue: 0,
      showInputBox: true,
      thumbLabel: true
    }
  }, {
    name: "Noise",
    type: 'single-input',
    valueFunc: "noise",
    inputType: 'slider',
    options: {
      min: 0,
      max: 1,
      step: 0.01,
      defaultValue: 0,
      showInputBox: true,
      thumbLabel: true
    }
  }, {
    name: "Posterize",
    type: 'single-input',
    valueFunc: "levels",
    inputType: 'slider',
    options: {
      min: 0,
      max: 1,
      step: 0.01,
      defaultValue: 0,
      showInputBox: true,
      thumbLabel: true
    }
  }, {
    name: "Pixelate",
    type: 'single-input',
    valueFunc: "pixelSize",
    inputType: 'slider',
    options: {
      min: 1,
      max: 20,
      step: 1,
      defaultValue: 1,
      showInputBox: true,
      thumbLabel: true
    }
  }
];

const multipleInputFilters = [
  {
    name: "Emboss",
    type: 'multiple-input',
    inputType: "toggle",
    values: [
      {
        name: "Strength",
        valueFunc: "embossStrength",
        inputType: "slider",
        options: {
          min: 0,
          max: 1,
          step: 0.1,
          showInputBox: true,
          thumbLabel: true
        }
      }, {
        name: "White Level",
        valueFunc: "embossWhiteLevel",
        inputType: "slider",
        options: {
          min: 0,
          max: 1,
          step: 0.1,
          showInputBox: true,
          thumbLabel: true
        }
      }, {
        name: "Direction",
        valueFunc: "embossDirection",
        inputType: "dropdown",
        options: ["top-left", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left"]
      }, {
        name: "Blend",
        valueFunc: "embossBlend",
        inputType: "toggle"
      }
    ]
  }, {
    name: "RGB",
    type: 'multiple-input',
    inputType: "toggle",
    values: [
      {
        name: "Red",
        valueFunc: "red",
        inputType: "slider",
        options: {
          min: 0,
          max: 256,
          step: 1,
          showInputBox: true,
          thumbLabel: true
        }
      }, {
        name: "Green",
        valueFunc: "green",
        inputType: "slider",
        options: {
          min: 0,
          max: 256,
          step: 1,
          showInputBox: true,
          thumbLabel: true
        }
      }, {
        name: "Blue",
        valueFunc: "blue",
        inputType: "slider",
        options: {
          min: 0,
          max: 256,
          step: 1,
          showInputBox: true,
          thumbLabel: true
        }
      }
    ]
  }, {
    name: "HSL",
    type: 'multiple-input',
    inputType: "toggle",
    values: [
      {
        name: "Hue",
        valueFunc: "hue",
        inputType: "slider",
        options: {
          min: 0,
          max: 359,
          step: 1,
          showInputBox: true,
          thumbLabel: true
        }
      }, {
        name: "Saturation",
        valueFunc: "saturation",
        inputType: "slider",
        options: {
          min: -10,
          max: 10,
          step: 0.1,
          showInputBox: true,
          thumbLabel: true
        }
      }, {
        name: "Luminance",
        valueFunc: "luminance",
        inputType: "slider",
        options: {
          min: -2,
          max: 2,
          step: 0.1,
          showInputBox: true,
          thumbLabel: true
        }
      }
    ]
  }, {
    name: "HSV",
    type: 'multiple-input',
    inputType: "toggle",
    values: [
      {
        name: "Hue",
        valueFunc: "hue",
        inputType: "slider",
        options: {
          min: 0,
          max: 359,
          step: 1,
          showInputBox: true,
          thumbLabel: true
        }
      }, {
        name: "Saturation",
        valueFunc: "saturation",
        inputType: "slider",
        options: {
          min: -10,
          max: 10,
          step: 0.1,
          showInputBox: true,
          thumbLabel: true
        }
      }, {
        name: "Value",
        valueFunc: "value",
        inputType: "slider",
        options: {
          min: -10,
          max: 10,
          step: 0.1,
          showInputBox: true,
          thumbLabel: true
        }
      }
    ]
  }
];

const toggleFilters = [
  {
    name: "Invert",
    type: 'toggle-input',
    inputType: "toggle",
    defaultValue: false
  }, {
    name: "Grayscale",
    type: 'toggle-input',
    inputType: "toggle",
    defaultValue: false
  }
];