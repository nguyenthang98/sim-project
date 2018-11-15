// Konva Shapes
import { Circle as _circle, Rect as _rect, Ellipse as _ellipse, Wedge as _wedge, RegularPolygon as _regPolygon, Star as _star} from "konva";

// Konva-Based Shapes
export {
  Circle, Rect , Ellipse, Wedge, RegularPolygon, Star
}

interface SimShape {
  getGeometricKeys: () => string[];
}

// general funcitons
const defaultConfigs = { x: 0, y: 0, draggable: true, strokeEnabled: false, fillEnabled: true };
function getRandomHash() {
  return "#" + Math.random().toString(36).substr(2, 5);
}
function getRandomColor() {
  return "#" + Math.random().toString(16).substr(2, 6);
}

class Circle extends _circle implements SimShape {
  constructor() {
    super({
      ...defaultConfigs,
      radius: 100,
      name: getRandomHash(),
      fill: getRandomColor()
    });
  }

  getGeometricKeys(): string[]{
    return ["radius"];
  }
}

class Rect extends _rect implements SimShape {
  constructor() {
    super({
      ...defaultConfigs,
      width: 200,
      height: 200,
      name: getRandomHash(),
      fill: getRandomColor()
    });
  }

  getGeometricKeys(): string[]{
    return [];
  }
}

class Ellipse extends _ellipse implements SimShape{
  constructor() {
    super({
      ...defaultConfigs,
      radius: {
        x: 200,
        y: 100
      },
      name: getRandomHash(),
      fill: getRandomColor()
    });
  }

  getGeometricKeys(): string[]{
    return ["radiusX", "radiusY"];
  }
}

class Wedge extends _wedge implements SimShape {
  constructor() {
    super({
      ...defaultConfigs,
      angle: 60,
      radius: 100,
      name: getRandomHash(),
      fill: getRandomColor()
    });
  }

  getGeometricKeys(): string[]{
    return ["angle", "radius"];
  }

}

class RegularPolygon extends _regPolygon implements SimShape {
  constructor() {
    super({
      ...defaultConfigs,
      radius: 100,
      sides: 6,
      name: getRandomHash(),
      fill: getRandomColor()
    });
  }

  getGeometricKeys(): string[]{
    return ["sides", "radius"];
  }

}

class Star extends _star implements SimShape {
  constructor() {
    super({
      ...defaultConfigs,
      innerRadius: 60,
      outerRadius: 70,
      numPoints: 6,
      name: getRandomHash(),
      fill: getRandomColor()
    });
  }

  getGeometricKeys(): string[]{
    return ["innerRadius", "outerRadius", "numPoints"];
  }
}