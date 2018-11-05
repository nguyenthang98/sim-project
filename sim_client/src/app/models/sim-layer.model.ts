import { Layer, Circle, Rect } from "konva";

export class SimLayer extends Layer {
  addObject(className) {
    const hash = "#" + Math.random().toString(36).substr(2, 8);
    switch(className) {
      case 'Circle': {
        console.log("adding circle");
        const newCircle = new Circle({
          radius: 50,
          name: hash
        });
        this.add(newCircle);
        return newCircle;
        break;
      }
      case 'Rect': {
        console.log("adding rect");
        const newRect = new Rect({
          name: hash
        });
        this.add(newRect);
        return newRect;
        break;
      }
      default: {
        console.log("unknown shape");
        return null;
      }
    }
  }
}