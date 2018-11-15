import { Layer, Shape, Image } from "konva";
import { Filters } from "konva";
import * as supportedShapes from "./sim-supported-shape.config";

export class SimLayer extends Layer {
  addObject(className) {
    const newShape = this.createShape(className);
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

  private createShape(className) {
    const constructor = supportedShapes[className];
    // generate randomly fill color and name
    if(constructor) {
      const newShape = new constructor();
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

  addImage(src) {
    const filters = [Filters.Blur, Filters.Brighten, Filters.Contrast, Filters.Enhance];
    console.log("adding image into current layer");  
    const imageEle = document.createElement('img'); 
    imageEle.onload = () => {
      const konvaImage = new Image({
        image: imageEle,
        draggable: true
      });
      konvaImage.filters(filters);

      this.add(konvaImage);
      this.batchDraw();
    }
    imageEle.src = src;
  }

  getShapes() {
    return this.getChildren(c => c instanceof Shape);
  }
}