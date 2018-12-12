import { Layer, Shape } from "konva";
import { get } from "lodash";
import * as supportedShapes from "./sim-supported-shape.config";

export class SimLayer extends Layer {
  constructor(layerJson?) {
    super(get(layerJson, 'attrs', {}));

    get(layerJson, 'children', []).forEach(shapeJson => {
      const _constructor = supportedShapes[shapeJson.className];
      if(_constructor) {
        const shape = this.addShape(new _constructor(shapeJson));
        if(shape.width() && shape.height()) {
          shape.cache();
        }
      }
    })
  }

  addObject(className, props?:any) {
    const newShape = this.createShape(className, props);
    if(newShape) {
      // console.log(`Created shape ${className}`, newShape);
      return newShape;
    } else {
      // console.log(`Cannot create shape ${className}`);
      return null;
    }
  }

  private createShape(className, props?:any) {
    const _constructor = supportedShapes[className];
    // generate randomly fill color and name
    if(_constructor) {
      const newShape = new _constructor({attrs: props});
      this.addShape(newShape);
      this.batchDraw();
      return newShape;
    } else
      return null;
  }

  addImage(src, props?:any) {
    const imageEle = document.createElement('img'); 
    imageEle.crossOrigin = "Anonymous";
    imageEle.onload = () => {
      const _newImage = this.createShape('Image', {
        image: imageEle,
        ...(props || {})
      })
      _newImage.cache();

      this.add(_newImage);
      this.batchDraw();
    }
    imageEle.src = src;
  }

  private addShape(newShape) {
    newShape.on("transform", () => {
      newShape.width(newShape.width() * newShape.scaleX());
      newShape.height(newShape.height() * newShape.scaleY());
      newShape.scaleX(1);
      newShape.scaleY(1);

      // update shape
      newShape.clearCache();
      newShape.draw();
      newShape.cache();
      newShape.getLayer().batchDraw();
    })

    this.add(newShape);
    return newShape;
  }

  getShapes(): any {
    return this.getChildren(c => c instanceof Shape).toArray().reverse();
  }

  isBGLayer(): boolean {
    return false;
  }

  exportJSON() {
    return {
      attrs: JSON.parse(this.toJSON()).attrs,
      children: this.getShapes().reverse().map(shape => shape.exportJSON()),
      className: 'SimLayer'
    }
  }

}