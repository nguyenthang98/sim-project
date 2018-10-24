import { Component, OnInit } from '@angular/core';
import { CanvasUtilsService } from '../../services/canvas-utils.service';

@Component({
  selector: 'app-sim-demo',
  templateUrl: './sim-demo.component.html',
  styleUrls: ['./sim-demo.component.css']
})
export class SimDemoComponent {

  private stage: any;
  private containerId: string = 'konva-container';
  private currLayer = null; 

  private STAGE_WIDTH = 500;
  private STAGE_HEIGHT = 500;

  constructor(private canvasUtils: CanvasUtilsService) {
  }

  ngAfterViewInit() {
    console.log("after view init");
    this.stage = this.canvasUtils.createStage(this.containerId, {
      width: this.STAGE_WIDTH,
      height: this.STAGE_HEIGHT
    });
  }

  changeStageSize(width, height) {
    console.log(`change stage to ${width}, ${height}`);
    this.stage.width(width);
    this.stage.height(height);
    this.stage.batchDraw();
  }

  getLayers() {
    return this.stage ? this.stage.getLayers() : [];
  }

  addLayer(): any {
    const _layer = this.canvasUtils.createLayer(this.stage);
    _layer.name(`Layer ${this.stage.getLayers().length}`);
    this.currLayer = _layer;
    return _layer;
  }

  addCircle(): any {
    if(!this.currLayer) return;
    const _circle = this.canvasUtils.createCircle({
      x: Math.random() * this.STAGE_WIDTH,
      y: Math.random() * this.STAGE_HEIGHT,
      radius: Math.random() * 10
    });
    this.currLayer.add(_circle);
    this.currLayer.draw();
    return _circle;
  }
}
