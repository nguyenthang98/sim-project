import { Component, Input, OnDestroy } from '@angular/core';
import { SimApiService } from 'src/app/services/sim-api.service';

@Component({
  selector: 'sim-shape-properties',
  templateUrl: './sim-shape-properties.component.html',
  styleUrls: ['./sim-shape-properties.component.css']
})
export class SimShapePropertiesComponent implements OnDestroy{
  @Input() shape;

  currentSelectedFont: any;

  constructor(private apiService: SimApiService) {
    this.currentSelectedFont = null;
  }

  ngOnDestroy() {
  }

  redrawShape() {
    this.shape.clearCache();
    this.shape.draw();

    // apply filters
    this.shape.cache();
    this.shape.getLayer().batchDraw();
  }

  getFonts(filterText) {
    return this.apiService.getListFontsAsync(filterText);
  }

  loadFont(fontFamily) {
    this.apiService.loadFont(fontFamily, 'regular', ()=>{
      this.redrawShape();
    }); 
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