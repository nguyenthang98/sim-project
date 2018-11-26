// Konva Shapes
import {
  Circle as _circle, Rect as _rect, Ellipse as _ellipse, Wedge as _wedge, RegularPolygon as _regPolygon, 
  Star as _star, Image as _image, Line as _line, Text as _text
} from "konva";

// Konva-Based Shapes
export {
  Circle, Rect , Ellipse, Wedge, RegularPolygon, Star, Image, Line, Text
}

interface SimShape {
  getGeometricKeys: () => string[];
}

// general props and functions
const defaultConfigs = { x: 0, y: 0, draggable: true, strokeEnabled: false, fillEnabled: true };
function getRandomHash() {
  return "#" + Math.random().toString(36).substr(2, 5);
}
function getRandomColor() {
  return "#" + Math.random().toString(16).substr(2, 6);
}

class Circle extends _circle implements SimShape {
  constructor(props?:any) {
    super({
      ...defaultConfigs,
      radius: 100,
      name: getRandomHash(),
      fill: getRandomColor(),
      ...(props || {})
    });
  }

  getGeometricKeys(): string[]{
    return ["radius"];
  }
}

class Rect extends _rect implements SimShape {
  constructor(props?:any) {
    super({
      ...defaultConfigs,
      width: 200,
      height: 200,
      name: getRandomHash(),
      fill: getRandomColor(),
      ...(props || {})
    });
  }

  getGeometricKeys(): string[]{
    return [];
  }
}

class Ellipse extends _ellipse implements SimShape{
  constructor(props?:any) {
    super({
      ...defaultConfigs,
      radius: {
        x: 200,
        y: 100
      },
      name: getRandomHash(),
      fill: getRandomColor(),
      ...(props || {})
    });
  }

  getGeometricKeys(): string[]{
    return ["radiusX", "radiusY"];
  }
}

class Wedge extends _wedge implements SimShape {
  constructor(props?:any) {
    super({
      ...defaultConfigs,
      angle: 60,
      radius: 100,
      name: getRandomHash(),
      fill: getRandomColor(),
      ...(props || {})
    });
  }

  getGeometricKeys(): string[]{
    return ["angle", "radius"];
  }

}

class RegularPolygon extends _regPolygon implements SimShape {
  constructor(props?:any) {
    super({
      ...defaultConfigs,
      radius: 100,
      sides: 6,
      name: getRandomHash(),
      fill: getRandomColor(),
      ...(props || {})
    });
  }

  getGeometricKeys(): string[]{
    return ["sides", "radius"];
  }

}

class Star extends _star implements SimShape {
  constructor(props?:any) {
    super({
      ...defaultConfigs,
      innerRadius: 60,
      outerRadius: 70,
      numPoints: 6,
      name: getRandomHash(),
      fill: getRandomColor(),
      ...(props || {})
    });
  }

  getGeometricKeys(): string[]{
    return ["innerRadius", "outerRadius", "numPoints"];
  }
}

class Image extends _image implements SimShape {
  constructor(props?:any) {
    console.log("create Image", props);
    super({
      ...defaultConfigs,
      name: getRandomHash(),
      fill: getRandomColor(),
      ...(props || {})
    });
  }

  getGeometricKeys(): string[]{
    return [];
  }
}

class Line extends _line implements SimShape {
  tempPoints: any[];
  constructor(props?:any) {
    console.log("create Line", props);
    super({
      ...defaultConfigs,
      name: getRandomHash(),
      fill: getRandomColor(),
      ...(props || {})
    });
    this.tempPoints = [];
  }

  getGeometricKeys(): string[]{
    return [];
  }
}

class Text extends _text implements SimShape {
  hasExtraProps: boolean;

  constructor(props?:any) {
    console.log("create Text", props);
    super({
      ...defaultConfigs,
      text: "Default text",
      name: getRandomHash(),
      fill: getRandomColor(),
      stroke: getRandomColor(),
      strokeEnabled: true,
      ...(props || {})
    });

    this.hasExtraProps = true;
  }

  getGeometricKeys(): string[]{
    return [];
  }
}