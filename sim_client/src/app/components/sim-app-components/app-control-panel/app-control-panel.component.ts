import { Component, Input } from '@angular/core';
import {AppConfig } from "../../../models/app-config.model";
import { MatTableDataSource } from '@angular/material/table';
import { CanvasUtilsService } from 'src/app/services/canvas-utils.service';
import { Filters } from "konva";

const filterFuncMap = {
  "Blur": {
    valueName: "blurRadius",
    inputType: "slider",
    min: 0,
    max: 40,
    step: 0.5
  },
  "Brighten": {
    valueName: "brightness",
    inputType: "slider",
    min: -1,
    max: 1,
    step: 0.01
  },
  "Contrast": {
    valueName: "contrast",
    inputType: "slider",
    min: -100,
    max: 100,
    step: 1
  },
  "Enhance": {
    valueName: "enhance",
    inputType: "slider",
    min: -1,
    max: 1,
    step: 0.01
  },
  "Pixelate": {
    valueName: "pixelSize",
    inputType: "slider",
    min: 1,
    max: 20,
    step: 0.5
  } 
}

@Component({
  selector: 'app-control-panel',
  templateUrl: './app-control-panel.component.html',
  styleUrls: ['./app-control-panel.component.css']
})
export class AppControlPanelComponent{
  @Input("app-config") appConfig: AppConfig;

  private SCREEN_WIDTH: number;
  private SCREEN_HEIGHT: number;
  private fileToURL: any;

  constructor(private canvasUtils: CanvasUtilsService) { 
    this.SCREEN_HEIGHT = window.screen.height;
    this.SCREEN_WIDTH = window.screen.width;
    this.fileToURL = window.URL.createObjectURL;
  }

  getLayerDataSource() {
    return new MatTableDataSource(this.appConfig.layers.layerList);
  }

  getAdjustmentsList() {
    return Object.keys(this.appConfig.adjustments);
  }

  removeLayer(layer) {
    console.log("removing layer!", layer);
    this.appConfig.layers.removeLayer(layer);
    this.appConfig.currentFocusedObject = null;
  }

  isShape(object) {
    return this.canvasUtils.isShape(object);
  }

  getCpPosition(ele: any) {
    if(ele.nextSibling) {
      const inputClientRect = ele.getBoundingClientRect();
      // 369px is color picker popup height
      if (inputClientRect.y + inputClientRect.height + 369 >= this.SCREEN_HEIGHT) {
        console.log("top");
        return "top";
      } else {
        console.log("right");
        return "right";
      }
    } else {
      console.log("right");
      return "right";
    }
  }

  onChangeCurrentLayer(newLayer) {
    this.appConfig.currentFocusedObject = null;
  }

  getFilterConfig(func) {
    const filterName = Object.keys(Filters).find(k => Filters[k] == func);
    return filterFuncMap[filterName];
  }

  loadImage() {
    const inputEle = document.createElement("input");
    inputEle.type = "file";

    inputEle.addEventListener('change', () => {
      const file = inputEle.files[0];
      if(!file) return;
      if(!this.appConfig.layers.currentLayer) return;
      this.appConfig.layers.currentLayer.addImage(this.fileToURL(file)); 
    })

    inputEle.click();
  }
}
