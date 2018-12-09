// Konva Shapes
import {
  Circle as _circle, Rect as _rect, Ellipse as _ellipse, Wedge as _wedge, RegularPolygon as _regPolygon, 
  Star as _star, Image as _image, Line as _line, Text as _text, Filters
} from "konva";
//import { getFiltersClassName } from "../utils";

// Konva-Based Shapes
export {
  Circle, Rect , Ellipse, Wedge, RegularPolygon, Star, Image, Line, Text
}

const availableFilters = ["Blur", "Brighten", "Contrast", "Enhance", "Noise", "Posterize",
                          "Pixelate", "Emboss", "RGB", "HSL", "Invert", "Grayscale"];
function getFiltersClassName(shape) {
  const filters = shape.filters();
  return availableFilters.filter(className => filters.find(f => f === Filters[className]));
}

interface SimShape {
  getGeometricKeys: () => string[];
  exportJSON: () => any;
  fromJSON: (any) => any;
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

  exportJSON() {
    const JSONObj = JSON.parse(this.toJSON());
    if(JSONObj.attrs.filters && JSONObj.attrs.filters.length) {
      JSONObj.attrs.filters = getFiltersClassName(this);
    }
    return JSONObj;
  }

  fromJSON(json) {
    Object.keys(json.attrs).forEach(key => {
      if(typeof(this[key]) == 'function' && key !== 'filters') {
        this[key](json.attrs[key]);
      } else if(key == 'filters') {
        const filters = json.attrs[key];
        this.filters(filters.map(f => Filters[f]));
      }
    })
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

  exportJSON() {
    const JSONObj = JSON.parse(this.toJSON());
    return JSONObj;
  }

  fromJSON(json) {
    Object.keys(json.attrs).forEach(key => {
      if(typeof(this[key]) == 'function' && key !== 'filters') {
        this[key](json.attrs[key]);
      } else if(key == 'filters') {
        const filters = json.attrs[key];
        this.filters(filters.map(f => Filters[f]));
      }
    })
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

  exportJSON() {
    const JSONObj = JSON.parse(this.toJSON());
    return JSONObj;
  }

  fromJSON(json) {
    Object.keys(json.attrs).forEach(key => {
      if(typeof(this[key]) == 'function' && key !== 'filters') {
        this[key](json.attrs[key]);
      } else if(key == 'filters') {
        const filters = json.attrs[key];
        this.filters(filters.map(f => Filters[f]));
      }
    })
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

  exportJSON() {
    const JSONObj = JSON.parse(this.toJSON());
    return JSONObj;
  }

  fromJSON(json) {
    Object.keys(json.attrs).forEach(key => {
      if(typeof(this[key]) == 'function' && key !== 'filters') {
        this[key](json.attrs[key]);
      } else if(key == 'filters') {
        const filters = json.attrs[key];
        this.filters(filters.map(f => Filters[f]));
      }
    })
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

  exportJSON() {
    const JSONObj = JSON.parse(this.toJSON());
    return JSONObj;
  }

  fromJSON(json) {
    Object.keys(json.attrs).forEach(key => {
      if(typeof(this[key]) == 'function' && key !== 'filters') {
        this[key](json.attrs[key]);
      } else if(key == 'filters') {
        const filters = json.attrs[key];
        this.filters(filters.map(f => Filters[f]));
      }
    })
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

  exportJSON() {
    const JSONObj = JSON.parse(this.toJSON());
    return JSONObj;
  }

  fromJSON(json) {
    Object.keys(json.attrs).forEach(key => {
      if(typeof(this[key]) == 'function' && key !== 'filters') {
        this[key](json.attrs[key]);
      } else if(key == 'filters') {
        const filters = json.attrs[key];
        this.filters(filters.map(f => Filters[f]));
      }
    })
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

  exportJSON() {
    const JSONObj = JSON.parse(this.toJSON());
    JSONObj.attrs.imageSource = this.image().src;
    return JSONObj;
  }

  fromJSON(json) {
    Object.keys(json.attrs).forEach(key => {
      if(typeof(this[key]) == 'function' && key !== 'filters' && key !== 'imageSource') {
        this[key](json.attrs[key]);
      } else if(key == 'filters') {
        const filters = json.attrs[key];
        this.filters(filters.map(f => Filters[f]));
      } else if(key == 'imageSource') {
        console.log(json.attrs.imageSource);
      }
    })
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

  exportJSON() {
    const JSONObj = JSON.parse(this.toJSON());
    return JSONObj;
  }

  fromJSON(json) {
    Object.keys(json.attrs).forEach(key => {
      if(typeof(this[key]) == 'function' && key !== 'filters') {
        this[key](json.attrs[key]);
      } else if(key == 'filters') {
        const filters = json.attrs[key];
        this.filters(filters.map(f => Filters[f]));
      }
    })
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
      fontSize: 100,
      ...(props || {})
    });

    this.hasExtraProps = true;
  }

  getGeometricKeys(): string[]{
    return [];
  }

  exportJSON() {
    const JSONObj = JSON.parse(this.toJSON());
    return JSONObj;
  }

  fromJSON(json) {
    Object.keys(json.attrs).forEach(key => {
      if(typeof(this[key]) == 'function' && key !== 'filters') {
        this[key](json.attrs[key]);
      } else if(key == 'filters') {
        const filters = json.attrs[key];
        this.filters(filters.map(f => Filters[f]));
      }
    })
  }
}