import { ColorAdjustments } from './color-adjustments.model';
import { LayerList } from './layer-list.model';
import { Stage } from 'konva';
import { registerStageOnClick, removeAllTransformer } from "../utils.js"; 

export class AppConfig {
  mainConfig: {
    width: number,
    height: number,
    backgroundColor: string
  }
  adjustments: ColorAdjustments;
  layers: LayerList;
  currentFocusedObject: any;
  stage: Stage;

  constructor() {
    this.mainConfig = {
      width: 1080,
      height: 1080,
      backgroundColor: "rgba(255, 255, 255, 1)"
    }
    this.adjustments = new ColorAdjustments();
    this.layers = new LayerList();
    this.currentFocusedObject = null;
    this.stage = null;
  }

  initStage(containerId) {
    this.stage = new Stage({
      container: containerId,
      width: this.mainConfig.width,
      height: this.mainConfig.height,
      draggable: true
    });

    // for dev
    console.log(this.stage);

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
        this.changeStageScale(_lastScale + _additionScale);
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
    this.stage.width(this.mainConfig.width);
    this.stage.height(this.mainConfig.height);
    this.layers.backgroundLayer.updateBackground(this.mainConfig);
  }

  saveStageAsImage(imageName) {
    removeAllTransformer(this.stage);
    const _lastScale = this.stage.scale();
    this.stage.scale({x: 1, y: 1});
    this.stage.batchDraw();

    let dataUri = this.stage.toDataURL({
      x: this.stage.x(),
      y: this.stage.y(),
      width: this.mainConfig.width,
      height: this.mainConfig.height
    });

    let link = document.createElement("a");
    link.download = imageName + ".png";
    link.href = dataUri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);


    this.stage.scale(_lastScale);
    this.stage.batchDraw();
  }
}