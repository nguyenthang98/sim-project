import { Component, Input } from '@angular/core';
import { AppConfig } from 'src/app/models/app-config.model';
import { _MatTreeNodeMixinBase } from '@angular/material';
import { removeAllTransformer, setCurrentFocusedObject } from '../../../utils';

@Component({
  selector: 'app-top-panel',
  templateUrl: './app-top-panel.component.html',
  styleUrls: ['./app-top-panel.component.css']
})
export class AppTopPanelComponent {
  @Input("app-config") appConfig: AppConfig;
  showObjectList: boolean;
  showRotation: boolean;
  showOpacity: boolean;

  constructor() { }

  clearToggledPanels(except) {
    const lastValue = this[except];
    this.showObjectList = false;
    this.showRotation = false;
    this.showOpacity = false;

    if(except) {
      this[except] = lastValue;
    }
  }

  removeObject(object) {
    console.log("removing object", object);
    const _tempLayer = object.getLayer();
    object.remove();
    _tempLayer.batchDraw();
    if(object == this.appConfig.currentFocusedObject) {
      this.appConfig.currentFocusedObject = null;
      removeAllTransformer(this.appConfig.stage);
    }
  }

  duplicateObject(object) {
    const objectProps = object.toObject();
    console.log(objectProps);
    objectProps.attrs.x = 0;
    objectProps.attrs.y = 0;
    objectProps.attrs.name += "(Copy)";
    if(objectProps.className == "Image") {
      this.appConfig.layers.currentLayer.addImage(object.getImage().src, objectProps.attrs);
    } else {
      this.appConfig.layers.currentLayer.addObject(objectProps.className, objectProps.attrs);
    }
  }

  shouldDisableMoveUpObj() {
    if (!this.appConfig.currentFocusedObject) return true;
    else {
      if(this.appConfig.layers.currentLayer == this.appConfig.layers.backgroundLayer) {
        const _currentLayerObjs = this.appConfig.layers.currentLayer.getShapes();
        const _currentObjZIdx = this.appConfig.currentFocusedObject.getZIndex();
        if (_currentObjZIdx == _currentLayerObjs.length) return true;
        else return false;
      } else {
        const _currentLayerObjs = this.appConfig.layers.currentLayer.getShapes();
        const _currentObjZIdx = this.appConfig.currentFocusedObject.getZIndex();
        if (_currentObjZIdx == _currentLayerObjs.length - 1) return true;
        else return false;
      }
    }
  }

  shouldDisableMoveDownObj() {
    if(!this.appConfig.currentFocusedObject) return true;
    else {
      if(this.appConfig.layers.currentLayer == this.appConfig.layers.backgroundLayer) {
        if(this.appConfig.currentFocusedObject.getZIndex() == 1) return true;
        else return false;
      } else {
        if(this.appConfig.currentFocusedObject.getZIndex() == 0) return true;
        else return false;
      }
    }
  }

  focusObject(object) {
    setCurrentFocusedObject(this.appConfig, object);
  }
}
