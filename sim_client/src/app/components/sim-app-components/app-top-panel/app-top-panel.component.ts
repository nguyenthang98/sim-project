import { Component, Input } from '@angular/core';
import { AppConfig } from 'src/app/models/app-config.model';
import { _MatTreeNodeMixinBase } from '@angular/material';

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
    this.appConfig.currentFocusedObject = null;
  }
}
