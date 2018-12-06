import { LayerList } from './layer-list.model';
import { Stage } from 'konva';
import { registerStageOnClick, removeAllTransformer, registerStageOnDrawLine } from "../utils.js"; 
import { isFinte } from "lodash";

export class AppConfig {
  mainConfig: {
    width: number,
    height: number,
    backgroundColor: string
  }
  layers: LayerList;
  currentFocusedObject: any;
  stage: Stage;
  mode: any;

  constructor() {
    this.mainConfig = {
      width: 1080,
      height: 1080,
      backgroundColor: "rgba(255, 255, 255, 1)"
    }
    this.layers = new LayerList();
    this.currentFocusedObject = null;
    this.stage = null;
    this.mode = null;
  }

  initStage(containerId) {
    this.stage = new Stage({
      container: containerId,
      width: this.mainConfig.width,
      height: this.mainConfig.height,
      draggable: true
    });

    // for dev
    console.log(this, this.stage);

    // set stage scale to fit window
    const _stageContainer = this.stage.container();
    const _containerBoundingClient = _stageContainer.getBoundingClientRect();
    const _diffScaleX = (_containerBoundingClient.width  / this.mainConfig.width);
    const _diffScaleY = (_containerBoundingClient.height  / this.mainConfig.height);
    const _newScale = Math.min(_diffScaleX, _diffScaleY) * 0.8;
    this.stage.scaleX(_newScale);
    this.stage.scaleY(_newScale);
    this.stage.x((_containerBoundingClient.width - this.mainConfig.width * _newScale) / 2);
    this.stage.y((_containerBoundingClient.height - this.mainConfig.height * _newScale) / 2);

    // mouse wheel handler
    this.stage.on("wheel", (event) => {
      if(event.evt.ctrlKey) {
        event.evt.preventDefault();
        const _additionScale = Math.sign(event.evt.deltaY) * -0.05;
        const _lastScale = this.stage.scaleX();
        let _newScale = _lastScale + _additionScale
        if(_newScale < 0) _newScale = 0;
        else if(_newScale > 2) _newScale = 2;
        this.changeStageScale(_newScale);
      }
    });

    // add all existed layer
    this.stage.add(this.layers.backgroundLayer);
    this.layers.backgroundLayer.initBackground(this.mainConfig);

    this.layers.layerList.forEach(l => {
      this.stage.add(l);
    });

    // register event
    registerStageOnClick(this);
    registerStageOnDrawLine(this);
  }

  changeStageScale(event) {
    const _newScale = event;
    const _containerBoundingClient = this.stage.container().getBoundingClientRect();
    this.stage.scaleX(event);
    this.stage.scaleY(event);
    this.stage.x((_containerBoundingClient.width - this.mainConfig.width * _newScale) / 2);
    this.stage.y((_containerBoundingClient.height - this.mainConfig.height * _newScale) / 2);

    this.stage.batchDraw();
  }

  updateMainConfig(event) {
    console.log(event);
    this.stage.width(this.mainConfig.width);
    this.stage.height(this.mainConfig.height);
    this.layers.backgroundLayer.updateBackground(this.mainConfig);
  }

  toImageURL({ imageName, exportType, exportQuality, x, y, width, height}) {
    removeAllTransformer(this.stage);
    const _lastScale = this.stage.scale();
    const mimeType = exportType ? `image/${exportType}` : "image\png";
    this.stage.scale({x: 1, y: 1});
    this.stage.batchDraw();

    const dataURL = this.stage.toDataURL({
      x: this.stage.x() + (isFinite(x) ? x : 0),
      y: this.stage.y() + (isFinite(y) ? y : 0),
      width: isFinite(width) ? width : this.mainConfig.width,
      height: isFinite(height) ? height : this.mainConfig.height,
      mimeType: mimeType,
      quality: exportQuality
    });

    // return last scale
    this.stage.scale(_lastScale);
    this.stage.batchDraw();

    return dataURL;
  }

  toBlob({ imageName, exportType, exportQuality, x, y, width, height}) {
    removeAllTransformer(this.stage);
    const _lastScale = this.stage.scale();
    this.stage.scale({x: 1, y: 1});
    this.stage.batchDraw();

    const _canvas = this.stage.toCanvas({
      callback: function(cv) {
        console.log(cv);
      },
      x: this.stage.x() - (isFinite(x) ? x : 0),
      y: this.stage.y() - (isFinite(y) ? y : 0),
      width: isFinite(width) ? width : this.mainConfig.width,
      height: isFinite(width) ? width : this.mainConfig.height
    });

    const mimeType = exportType ? `image/${exportType}` : "image\png";

    // return last scale
    this.stage.scale(_lastScale);
    this.stage.batchDraw();

    return new Promise(resolve => {
      _canvas.toBlob((blob) => {
        resolve(blob);
      }, mimeType, exportQuality || 1);
    })
  }

  saveStageAsImage({ imageName, exportType, exportQuality, x, y, width, height}) {
    this.toBlob({ imageName, exportType, exportQuality, x, y, width, height })
      .then((blob:any) => {
        const imgURL = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = imageName;
        link.href = imgURL;
        link.click();
        link.remove();
      })
  }

  exportJSON() {
    return {
      attrs: this.mainConfig,
      children: this.layers.exportJSON(),
      className: 'AppConfig'
    }
  }
}
