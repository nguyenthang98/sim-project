import { Layer, Circle, Rect, Shape, Ellipse, Wedge, Star, RegularPolygon, Image } from "konva";
import { Filters } from "konva";

export class SimLayer extends Layer {
  addObject(className) {
    const hash = "#" + Math.random().toString(36).substr(2, 8);
    const filters = [Filters.Blur, Filters.Brighten, Filters.Contrast, Filters.Enhance];

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
      case 'Eclipse': {
        console.log("adding eclipse to layer ", this.name());
        const newEllipse = new Ellipse({
          // x: stage.getWidth() / 2,
          // y: stage.getHeight() / 2,
          name: hash,
          draggable: true,
          radius:{
            x:100,
            y:50
          },
          fill: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
        });
        newEllipse.filters(filters);
        console.log("filters for rect", newEllipse.filters());
        this.add(newEllipse);
        this.batchDraw();
        return newEllipse;
      }
      case 'Wedge': {
        console.log("adding Wedge to layer ", this.name());
        const newWedge = new Wedge({
          // x: stage.getWidth() / 2,
          // y: stage.getHeight() / 2,
          name: hash,
          draggable: true,
          radius: 70,
          angle: 60,
          fill: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
        });
        newWedge.filters(filters);
        console.log("filters for Wedge", newWedge.filters());
        this.add(newWedge);
        this.batchDraw();
        return newWedge;
      }
      case 'Star': {
        console.log("adding Star to layer ", this.name());
        const newWedge = new Star({
          // x: stage.getWidth() / 2,
          // y: stage.getHeight() / 2,
          name: hash,
          draggable: true,
          numPoints: 5,
          innerRadius: 40,
          outerRadius: 70,
          fill: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
        });
        newWedge.filters(filters);
        console.log("filters for Wedge", newWedge.filters());
        this.add(newWedge);
        this.batchDraw();
        return newWedge;
      }
      case 'RegularPolygon': {
        console.log("adding RegularPolygon to layer ", this.name());
        const newRegularPolygon = new RegularPolygon({
          // x: stage.getWidth() / 2,
          // y: stage.getHeight() / 2,
          name: hash,
          draggable: true,
          sides: 6,
          radius: 70,
          fill: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
        });
        newRegularPolygon.filters(filters);
        console.log("filters for RegularPolygon", newRegularPolygon.filters());
        this.add(newRegularPolygon);
        this.batchDraw();
        return newRegularPolygon;
      }
      // case 'Line': {
      //   console.log("adding Line to layer ", this.name());
      //   const newLine = new Line({
      //     // x: stage.getWidth() / 2,
      //     // y: stage.getHeight() / 2,
      //     name: hash,
      //     draggable: true,
      //     points: [5, 70, 140,80,40,12],
      //     dash: [33, 10],
      //     lineJoin: 'round',
      //     fill: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
      //   });
      //   newLine.filters(filters);
      //   console.log("filters for Line", newLine.filters());
      //   this.add(newLine);
      //   this.batchDraw();
      //   return newLine;
      // }
      default: {
        console.log("unknown shape");
        return null;
      }
    }
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