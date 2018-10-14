import { Injectable } from '@angular/core';
import * as Konva from 'konva';

@Injectable({
  providedIn: 'root'
})
export class CanvasUtilsService {
  constructor() {
  }

  createStage(containerId): Konva.Stage {
    const _stage = new Konva.Stage({
      container: containerId,
      width: 500,
      height: 500
    });

    const _layer = new Konva.Layer();
    const _circle = new Konva.Circle({
      x: _stage.getWidth() / 2,
      y: _stage.getHeight() / 2,
      radius: 70,
      fill: 'yellow',
      stroke: 'red',
      strokeWidth: 4,
      draggable: true
    })

    _stage.on("click tap", function(e) {
      if(e.target == _stage) {
        _stage.find("Transformer").destroy();
        return;
      }
      _stage.find("Transformer").destroy();
      const _tr = new Konva.Transformer();
      _layer.add(_tr);
      _tr.attachTo(e.target);
      _layer.draw();
    });

    _layer.add(_circle);
    _stage.add(_layer);

    return _stage;
  }
}