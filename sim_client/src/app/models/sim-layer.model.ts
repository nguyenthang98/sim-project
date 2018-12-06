import { Layer, Shape } from "konva";
import * as supportedShapes from "./sim-supported-shape.config";

export class SimLayer extends Layer {
  addObject(className, props?:any) {
    const newShape = this.createShape(className, props);
    if(newShape) {
      console.log(`Created shape ${className}`, newShape);
      this.add(newShape);
      this.batchDraw();
      return newShape;
    } else {
      console.log(`Cannot create shape ${className}`);
      return null;
    }
  }

  private createShape(className, props?:any) {
    const constructor = supportedShapes[className];
    // generate randomly fill color and name
    if(constructor) {
      const newShape = new constructor(props);
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

  getShapes(): any {
    return this.getChildren(c => c instanceof Shape).toArray().reverse();
  }

  isBGLayer(): boolean {
    return false;
  }

  exportJSON() {
    return {
      attrs: {
        name: this.name()        
      },
      chidren: this.getShapes().map(shape => shape.exportJSON()),
      className: 'SimLayer'
    }
  }
}