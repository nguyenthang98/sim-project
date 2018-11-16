import { Component, Input } from '@angular/core';
import { Filters, Image } from 'konva';

@Component({
  selector: 'sim-shape-properties',
  templateUrl: './sim-shape-properties.component.html',
  styleUrls: ['./sim-shape-properties.component.css']
})
export class SimShapePropertiesComponent {
  @Input() shape;

  constructor() { }

  getFilterConfig(func) {
    const filterName = Object.keys(Filters).find(k => Filters[k] == func);
    return filterFuncMap[filterName];
  }

  isImage(shape) {
    return shape instanceof Image;
  }
}

const filterFuncMap = {
  "Blur": {
    label: "Blur Radius",
    valueName: "blurRadius",
    inputType: "slider",
    min: 0,
    max: 40,
    step: 0.5
  },
  "Brighten": {
    label: "Brighten",
    valueName: "brightness",
    inputType: "slider",
    min: -1,
    max: 1,
    step: 0.01
  },
  "Contrast": {
    label: "Contrast",
    valueName: "contrast",
    inputType: "slider",
    min: -100,
    max: 100,
    step: 1
  },
  "Enhance": {
    label: "Enhance",
    valueName: "enhance",
    inputType: "slider",
    min: -1,
    max: 1,
    step: 0.01
  },
  "Pixelate": {
    label: "Pixel Size",
    valueName: "pixelSize",
    inputType: "slider",
    min: 1,
    max: 20,
    step: 0.5
  } 
}