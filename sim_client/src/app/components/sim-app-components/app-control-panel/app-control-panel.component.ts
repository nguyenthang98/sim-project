import { Component, Input } from '@angular/core';
import { AppConfig } from "../../../models/app-config.model";
import { MatTableDataSource } from '@angular/material/table';
import { setCurrentFocusedObject } from "../../../utils";
import { MatSnackBar } from "@angular/material"
import { Shape } from "konva" 

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

  constructor(private snackBar: MatSnackBar) { 
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
    return object instanceof Shape;
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
      width: 1,
      height: 1
    });
    this.appConfig.mode = "draw-line";
    setCurrentFocusedObject(this.appConfig, _newLine);
  }

  drawPolygon() {
    const _newLine = this.appConfig.layers.currentLayer.addObject("Line", {
      strokeEnabled: true,
      stroke: "black",
      fillEnabled: true,
      strokeWidth: 10,
      closed: true,
      width: 1,
      height: 1
    });
    this.appConfig.mode = "draw-polygon";
    setCurrentFocusedObject(this.appConfig, _newLine);

    const message = "Press ESC To Stop Drawing";
    const action = "OK"
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }

  stopDrawPolygon() {
    this.appConfig.mode = null;
    const _currObj = this.appConfig.currentFocusedObject;
    if(_currObj && _currObj.getClassName() == "Line") {
      _currObj.points(_currObj.tempPoints);
      this.focusObject(_currObj);
    }
  }

  loadImage() {
    const inputEle = document.createElement("input");
    inputEle.type = "file";
    inputEle.accept = "image/*";

    inputEle.addEventListener('change', () => {
      const file = inputEle.files[0];
      if(!file) return;
      if(!this.appConfig.layers.currentLayer) return;
      this.appConfig.layers.currentLayer.addImage(this.fileToURL(file)); 
    })

    inputEle.click();
  }
}
