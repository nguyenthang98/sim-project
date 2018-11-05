import { Component, OnInit, Input } from '@angular/core';
import {AppConfig } from "../../../models/app-config.model";
import { MatTableDataSource } from '@angular/material/table';
import { CanvasUtilsService } from 'src/app/services/canvas-utils.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './app-control-panel.component.html',
  styleUrls: ['./app-control-panel.component.css']
})
export class AppControlPanelComponent implements OnInit {
  @Input("app-config") appConfig: AppConfig;

  constructor(private canvasUtils: CanvasUtilsService) { }

  ngOnInit() {
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
    console.log(this.appConfig);
  }

  isShape(object) {
    return this.canvasUtils.isShape(object);
  }
}
