import { Component, Input } from '@angular/core';

@Component({
  selector: 'sim-shape-properties',
  templateUrl: './sim-shape-properties.component.html',
  styleUrls: ['./sim-shape-properties.component.css']
})
export class SimShapePropertiesComponent {
  @Input() shape;

  constructor() { }

  redrawShape() {
    this.shape.clearCache();
    this.shape.draw();

    // apply filters
    this.shape.cache();
    this.shape.getLayer().batchDraw();
  }

  getFontFamilys() {
    return ['Arial', 'Serif', 'San-Serif'];
  }

  dashArrToString(dashArr) {
    try {
      return `${dashArr.join(" ")}`;
    } catch(err) {
      return "";
    }
  }

  stringToDashArr(string) {
    try {
      return string.trim().split(" ");
    } catch(err) {
      return [];
    }
  }
}