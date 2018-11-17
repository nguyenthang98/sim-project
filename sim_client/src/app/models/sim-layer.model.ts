import { Layer, Shape } from "konva";
import { Filters } from "konva";
import * as supportedShapes from "./sim-supported-shape.config";

export class SimLayer extends Layer {
  addObject(className, props) {
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
      })

      return newShape;
    } else
      return null;
  }

  addImage(src, props?:any) {
    const filters = [Filters.Blur, Filters.Brighten, Filters.Contrast, Filters.Enhance];
    const imageEle = document.createElement('img'); 
    imageEle.onload = () => {
      const _newImage = new supportedShapes.Image({
        image: imageEle,
        ...(props || {})
      });
      _newImage.cache();
      _newImage.filters((props || {}).filters || filters);

      this.add(_newImage);
      this.batchDraw();
    }
    imageEle.src = src;
  }

  getShapes() {
    return this.getChildren(c => c instanceof Shape);
  }
}