import { Shape, Transformer } from "konva";
import * as SimShapes from "./models/sim-supported-shape.config";

export { registerStageOnClick, removeAllTransformer, setCurrentFocusedObject, registerStageOnDrawLine };

function registerStageOnClick (appConfig) {
  appConfig.stage.on("click tap", (event) => {
    if(appConfig.mode == "draw-line") {
      removeAllTransformer(appConfig.stage);
    } else {
      if (event.target == appConfig.stage || event.target == appConfig.layers.backgroundLayer.bgRect) {
        removeAllTransformer(appConfig.stage);
        appConfig.currentFocusedObject = null;
        appConfig.stage.batchDraw();
      } else {
        setCurrentFocusedObject(appConfig, event.target);
      }
    }
  })
}

function registerStageOnDrawLine(appConfig) {
  let isDrawing = false;
  appConfig.stage.on("mousedown touchstart", () => {
    if(appConfig.mode == "draw-line") {
      appConfig.stage.draggable(false);
      isDrawing = true;
    }
  })

  appConfig.stage.on("mouseup touchend", () => {
    if(appConfig.mode == "draw-line") {
      isDrawing = false;
      appConfig.mode = null;
      appConfig.stage.draggable(true);
      setCurrentFocusedObject(appConfig, appConfig.currentFocusedObject);
    }
  })

  appConfig.stage.on("mousemove touchmove", (event) => {
    if(isDrawing && appConfig.mode == "draw-line" && (appConfig.currentFocusedObject instanceof SimShapes.Line)) {
      let pos = appConfig.stage.getPointerPosition();
      const _stageScale = appConfig.stage.scale();
      pos.x = (pos.x - appConfig.stage.x()) / _stageScale.x;
      pos.y = (pos.y - appConfig.stage.y()) / _stageScale.y;

      const points = [...appConfig.currentFocusedObject.points(), pos.x, pos.y];
      appConfig.currentFocusedObject.points(points);
      appConfig.currentFocusedObject.draw();
    }
  })
}

function setCurrentFocusedObject(appConfig, object) {
  if(object instanceof Shape && appConfig.stage.find('.' + object.name()).length) {
    const _newLayer = object.getLayer();

    removeAllTransformer(appConfig.stage);
    appConfig.layers.currentLayer = _newLayer;
    appConfig.currentFocusedObject = object;

    if(appConfig.mode != "draw-line") {
      const _newTransformer = new Transformer();
      _newLayer.add(_newTransformer);
      _newTransformer.attachTo(object);
    }
  } else {
    removeAllTransformer(appConfig.stage);
    appConfig.currentFocusedObject = null;
  }
  appConfig.stage.batchDraw();
}

function removeAllTransformer (stage) {
  stage.find("Transformer").each(tr => { tr.destroy(); })
}