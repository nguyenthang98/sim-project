import { SimLayer } from "./sim-layer.model";
import { Rect, Shape } from "konva";

export class SimBgLayer extends SimLayer {
  bgRect: Rect;

  initBackground(config) {
    this.bgRect = new Rect({
      width: config.width || this.width(),
      height: config.height || this.height(),
      fill: config.backgroundColor
    });

    this.add(this.bgRect);
    this.batchDraw();
  }

  updateBackground(config) {
    if(!this.bgRect) this.initBackground(config);
    else {
      this.bgRect.width(config.width);
      this.bgRect.height(config.height);
      this.bgRect.fill(config.backgroundColor);
      this.batchDraw();
    }
  }

  getShapes() {
    return this.getChildren(c => c instanceof Shape && c != this.bgRect).toArray().reverse();
  }

  isBGLayer(): boolean {
    return true;
  }
}