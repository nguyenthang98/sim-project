import { Component, Input } from '@angular/core';
import { AppConfig } from 'src/app/models/app-config.model';
import { _MatTreeNodeMixinBase } from '@angular/material';
import { removeAllTransformer } from '../../../utils';

@Component({
  selector: 'app-top-panel',
  templateUrl: './app-top-panel.component.html',
  styleUrls: ['./app-top-panel.component.css']
})
export class AppTopPanelComponent {
  @Input("app-config") appConfig: AppConfig;

  constructor() { }

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

  shouldDisableMoveUpObj() {
    if (!this.appConfig.currentFocusedObject) return true;
    else {
      const _currentLayerObjs = this.appConfig.layers.currentLayer.getShapes();
      const _currentObjZIdx = this.appConfig.currentFocusedObject.getZIndex();
      if(_currentObjZIdx == _currentLayerObjs.length) return true;
      else return false;
    }
  }

  shouldDisableMoveDownObj() {
    if(!this.appConfig.currentFocusedObject) return true;
    else {
      if(this.appConfig.layers.currentLayer == this.appConfig.layers.backgroundLayer) {
        if(this.appConfig.currentFocusedObject.getZIndex() == 1) return true;
        else return false;
      } else {
        return false;
      }
    }
  }
}
