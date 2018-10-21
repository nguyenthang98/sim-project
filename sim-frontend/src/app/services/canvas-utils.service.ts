import { Injectable } from '@angular/core';
import * as Konva from 'konva';

@Injectable({
  providedIn: 'root'
})
export class CanvasUtilsService {
  constructor() {
  }

  createStage(containerId, { width, height}: {width?:number, height?:number} = {}): Konva.Stage {
    const _stage = new Konva.Stage({
      container: containerId,
      width: width,
      height: height,
    });

    _stage.on("wheel", function(event) {
      console.log("on stage mouse wheel", event);
    });

    return _stage;
  }

  createCircle(
    {x, y, radius, fill, stroke, strokeWidth}:
    {x?: number, y?: number, radius?: number, fill?: string, stroke?: string, strokeWidth?: number}
    ) : Konva.Circle {
    return new Konva.Circle({
      x: x || 0,
      y: y || 0,
      radius: radius || 0,
      fill: fill || 'red',
      stroke: stroke || 'black',
      strokeWidth: strokeWidth || 2,
      draggable: true
    });
  }

  createLayer(stage): Konva.Layer {
    const _layer = new Konva.Layer();
    stage.add(_layer);
    return _layer;
  }
}