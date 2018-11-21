import { Component, Input } from '@angular/core';
import {AppConfig } from "../../../models/app-config.model";
import { MatTableDataSource } from '@angular/material/table';
import { CanvasUtilsService } from 'src/app/services/canvas-utils.service';
import { setCurrentFocusedObject } from "../../../utils";

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
    // this.appConfig.currentFocusedObject = null;
    setCurrentFocusedObject(this.appConfig, null);
  }

  focusObject(object) {
    setCurrentFocusedObject(this.appConfig, object);
  }

  drawLine() {
    const _newLine = this.appConfig.layers.currentLayer.addObject("Line", {
      strokeEnabled: true,
      stroke: "black",
      fillEnabled: false,
      strokeWidth: 5,
      width: 0,
      height: 0
    });
    this.appConfig.mode = "draw-line";
    setCurrentFocusedObject(this.appConfig, _newLine);
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
