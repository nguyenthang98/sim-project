// Konva Shapes
import {
  Circle as _circle, Rect as _rect, Ellipse as _ellipse, Wedge as _wedge, RegularPolygon as _regPolygon, 
  Star as _star, Image as _image, Line as _line, Text as _text, Filters
} from "konva";
import { get } from "lodash";

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
}

// general props and functions
const defaultConfigs = { x: 0, y: 0, draggable: true, strokeEnabled: false, fillEnabled: true };
function getRandomHash() {
  return "#" + Math.random().toString(36).substr(2, 5);
}
function getRandomColor() {
  return "#" + Math.random().toString(16).substr(2, 6);
}

function _exportJSON() {
    const JSONObj = JSON.parse(this.toJSON());
    if(JSONObj.attrs.filters && JSONObj.attrs.filters.length) {
      JSONObj.attrs.filters = getFiltersClassName(this);
    }
    JSONObj.attrs.strokeEnabled = this.strokeEnabled();
    JSONObj.attrs.fillEnabled = this.fillEnabled();
    JSONObj.attrs.shadowEnabled = this.shadowEnabled();
    return JSONObj;
}

class Circle extends _circle implements SimShape {
  constructor(shapeJson?) {
    super({
      ...defaultConfigs,
      radius: 100,
      name: getRandomHash(),
      fill: getRandomColor(),
      ...get(shapeJson, 'attrs', {})
    });

    let filters = [];
    get(shapeJson, 'attrs.filters', []).forEach(filterClassName => {
      filters.push(Filters[filterClassName]);
    })
    this.filters(filters);
  }

  getGeometricKeys(): string[]{
    return ["radius"];
  }

  exportJSON() {
    return _exportJSON.apply(this);
  }

}

class Rect extends _rect implements SimShape {
  constructor(shapeJson?) {
    super({
      ...defaultConfigs,
      width: 200,
      height: 200,
      name: getRandomHash(),
      fill: getRandomColor(),
      ...get(shapeJson, 'attrs', {})
    });

    let filters = [];
    get(shapeJson, 'attrs.filters', []).forEach(filterClassName => {
      filters.push(Filters[filterClassName]);
    })
    this.filters(filters);
  }
  getGeometricKeys(): string[]{
    return [];
  }

  exportJSON() {
    return _exportJSON.apply(this);
  }
}

class Ellipse extends _ellipse implements SimShape{
  constructor(shapeJson?:any) {
    super({
      ...defaultConfigs,
      radius: {
        x: 200,
        y: 100
      },
      name: getRandomHash(),
      fill: getRandomColor(),
      ...get(shapeJson, 'attrs', {})
    });

    let filters = [];
    get(shapeJson, 'attrs.filters', []).forEach(filterClassName => {
      filters.push(Filters[filterClassName]);
    })
    this.filters(filters);
  }

  getGeometricKeys(): string[]{
    return ["radiusX", "radiusY"];
  }

  exportJSON() {
    return _exportJSON.apply(this);
  }
}

class Wedge extends _wedge implements SimShape {
  constructor(shapeJson?:any) {
    super({
      ...defaultConfigs,
      angle: 60,
      radius: 100,
      name: getRandomHash(),
      fill: getRandomColor(),
      ...get(shapeJson, 'attrs', {})
    });

    let filters = [];
    get(shapeJson, 'attrs.filters', []).forEach(filterClassName => {
      filters.push(Filters[filterClassName]);
    })
    this.filters(filters);
  }

  getGeometricKeys(): string[]{
    return ["angle", "radius"];
  }

  exportJSON() {
    return _exportJSON.apply(this);
  }

}

class RegularPolygon extends _regPolygon implements SimShape {
  constructor(shapeJson?:any) {
    super({
      ...defaultConfigs,
      radius: 100,
      sides: 6,
      name: getRandomHash(),
      fill: getRandomColor(),
      ...get(shapeJson, 'attrs', {})
    });

    let filters = [];
    get(shapeJson, 'attrs.filters', []).forEach(filterClassName => {
      filters.push(Filters[filterClassName]);
    })
    this.filters(filters);
  }

  getGeometricKeys(): string[]{
    return ["sides", "radius"];
  }

  exportJSON() {
    return _exportJSON.apply(this);
    // const JSONObj = JSON.parse(this.toJSON());
    // return JSONObj;
  }

}

class Star extends _star implements SimShape {
  constructor(shapeJson?:any) {
    super({
      ...defaultConfigs,
      innerRadius: 60,
      outerRadius: 70,
      numPoints: 6,
      name: getRandomHash(),
      fill: getRandomColor(),
      ...get(shapeJson, 'attrs', {})
    });

    let filters = [];
    get(shapeJson, 'attrs.filters', []).forEach(filterClassName => {
      filters.push(Filters[filterClassName]);
    })
    this.filters(filters);
  }

  getGeometricKeys(): string[]{
    return ["innerRadius", "outerRadius", "numPoints"];
  }

  exportJSON() {
    return _exportJSON.apply(this);
  }
}

class Image extends _image implements SimShape {
  constructor(shapeJson?:any) {
    super({
      ...defaultConfigs,
      name: getRandomHash(),
      fill: getRandomColor(),
      ...get(shapeJson, 'attrs', {})
    });

    const imgSrc = get(shapeJson, 'attrs.imageSource');
    // console.log(imgSrc);
    if(imgSrc) {
      const imageEle = document.createElement('img');
      imageEle.crossOrigin = "Anonymous";
      imageEle.onload = () => {
        this.image(imageEle);
        this.cache();
      }
      imageEle.src = imgSrc;
    }

    let filters = [];
    get(shapeJson, 'attrs.filters', []).forEach(filterClassName => {
      filters.push(Filters[filterClassName]);
    })
    this.filters(filters);

  }

  getGeometricKeys(): string[]{
    return [];
  }

  exportJSON() {
    const JSONObj = _exportJSON.apply(this);
    JSONObj.attrs.imageSource = this.image().src;
    return JSONObj;
  }
}

class Line extends _line implements SimShape {
  tempPoints: any[];
  constructor(shapeJson?:any) {
    super({
      ...defaultConfigs,
      name: getRandomHash(),
      fill: getRandomColor(),
      ...get(shapeJson, 'attrs', {})
    });

    let filters = [];
    get(shapeJson, 'attrs.filters', []).forEach(filterClassName => {
      filters.push(Filters[filterClassName]);
    })
    this.filters(filters);

    this.tempPoints = [];
  }

  getGeometricKeys(): string[]{
    return [];
  }

  exportJSON() {
    return _exportJSON.apply(this);
  }
}

class Text extends _text implements SimShape {
  hasExtraProps: boolean;

  constructor(shapeJson?:any) {
    super({
      ...defaultConfigs,
      text: "Default text",
      name: getRandomHash(),
      fill: getRandomColor(),
      stroke: getRandomColor(),
      strokeEnabled: true,
      fontSize: 100,
      ...get(shapeJson, 'attrs', {})
    });

    let filters = [];
    get(shapeJson, 'attrs.filters', []).forEach(filterClassName => {
      filters.push(Filters[filterClassName]);
    })
    this.filters(filters);

    this.hasExtraProps = true;
  }

  getGeometricKeys(): string[]{
    return [];
  }

  exportJSON() {
    return _exportJSON.apply(this);
  }

}