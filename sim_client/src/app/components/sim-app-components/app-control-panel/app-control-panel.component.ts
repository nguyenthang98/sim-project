import { Component, OnInit, Input } from '@angular/core';
import {AppConfig } from "../../../models/app-config.model";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-control-panel',
  templateUrl: './app-control-panel.component.html',
  styleUrls: ['./app-control-panel.component.css']
})
export class AppControlPanelComponent implements OnInit {
  @Input("app-config") appConfig: AppConfig;

  constructor() { }

  ngOnInit() {
  }

  getLayerDataSource() {
    return new MatTableDataSource(this.appConfig.layers.layerList);
  }

  getAdjustmentsList() {
    return Object.keys(this.appConfig.adjustments);
  }
}
