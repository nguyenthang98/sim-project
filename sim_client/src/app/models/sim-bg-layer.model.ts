import { SimLayer } from "./sim-layer.model";
import { Shape } from "konva";
import { Rect } from "./sim-supported-shape.config";
import { get, cloneDeep } from "lodash";

export class SimBgLayer extends SimLayer {
  bgRect: Rect = null;

  constructor(bgLayerJson?) {
    super(bgLayerJson || {
      attrs: {
        name: "Background"
      }
    });

    // background rect;
    this.bgRect = new Rect(get(bgLayerJson, 'attrs.bgRect', {
      attrs: {
        width: this.width(),
        height: this.height(),
        draggable: false
      },
      children: [],
      className: "Rect"
    }));

    this.bgRect.draggable(false);
    this.add(this.bgRect);
    this.bgRect.moveToBottom();
  }

  initBackground(config) {
    if(!this.bgRect) {
      this.bgRect = new Rect({
        width: config.width || this.width(),
        height: config.height || this.height(),
        fill: config.backgroundColor,
        draggable: false
      });
      this.add(this.bgRect);
      this.bgRect.moveToBottom();
    } else {
      this.bgRect.width(get(config, 'width', this.width()));
      this.bgRect.height(get(config, 'height', this.height()));
      this.bgRect.fill(get(config, 'backgroundColor'));
    }
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

  exportJSON():any {
    const objectJSON = super.exportJSON.call(this);
    objectJSON.attrs.bgRect = cloneDeep(this.bgRect.exportJSON());
    return objectJSON;
  }
}
