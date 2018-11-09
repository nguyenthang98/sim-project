import { Layer, Circle, Rect, Shape } from "konva";
import { Filters } from "konva";

export class SimLayer extends Layer {
  addObject(className) {
    const filters = [Filters.Blur, Filters.Brighten, Filters.Pixelate, Filters.Contrast, Filters.Enhance];
    const hash = "#" + Math.random().toString(36).substr(2, 8);
    switch(className) {
      case 'Circle': {
        console.log("adding circle to layer ", this.name());
        const newCircle = new Circle({
          radius: 50,
          // random color
          fill: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
          name: hash,
          draggable: true
        });
        newCircle.filters(filters);
        this.add(newCircle);
        this.batchDraw();
        return newCircle;
      }
      case 'Rect': {
        console.log("adding rect to layer ", this.name());
        const newRect = new Rect({
          name: hash,
          draggable: true,
          width: 100,
          height: 100,
          fill: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
        });
        newRect.filters(filters);
        console.log("filters for rect", newRect.filters());
        this.add(newRect);
        this.batchDraw();
        return newRect;
      }
      default: {
        console.log("unknown shape");
        return null;
      }
    }
  }

  getShapes() {
    return this.getChildren(c => c instanceof Shape);
  }
}