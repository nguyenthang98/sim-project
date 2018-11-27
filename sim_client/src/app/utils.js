import { Shape, Transformer } from "konva";
import * as SimShapes from "./models/sim-supported-shape.config";

export { registerStageOnClick, removeAllTransformer, setCurrentFocusedObject, registerStageOnDrawLine, loadFontToDocument };

function loadFontToDocument(fontData, fontName, callback) {
  const newFontFace = new FontFace(fontName, fontData);
  newFontFace.load()
    .then(function (loadedFontFace) {
      console.log(loadedFontFace);
      document.fonts.add(loadedFontFace);
      callback && callback();
    })
    .catch(err => {
      console.error(err);
    })
}

function registerStageOnClick (appConfig) {
  appConfig.stage.on("click tap", (event) => {
    if(["draw-line", "draw-polygon"].includes(appConfig.mode)) {
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
    } else if(appConfig.mode == "draw-polygon") {
      removeAllTransformer(appConfig.stage);
      if(appConfig.currentFocusedObject instanceof SimShapes.Line) {
        const _currObj = appConfig.currentFocusedObject;
        let pos = appConfig.stage.getPointerPosition();
        const _stageScale = appConfig.stage.scale();
        pos.x = (pos.x - appConfig.stage.x()) / _stageScale.x;
        pos.y = (pos.y - appConfig.stage.y()) / _stageScale.y;
        _currObj.tempPoints = [..._currObj.tempPoints, pos.x, pos.y];

        const points = _currObj.tempPoints;
        _currObj.points(points);
        _currObj.getLayer().batchDraw();
      }
    }
  })

  appConfig.stage.on("mousemove touchmove", (event) => {
    const _currObj = appConfig.currentFocusedObject;
    if(isDrawing && appConfig.mode == "draw-line" && (_currObj instanceof SimShapes.Line)) {
      let pos = appConfig.stage.getPointerPosition();
      const _stageScale = appConfig.stage.scale();
      pos.x = (pos.x - appConfig.stage.x()) / _stageScale.x;
      pos.y = (pos.y - appConfig.stage.y()) / _stageScale.y;

      const points = [..._currObj.points(), pos.x, pos.y];
      _currObj.points(points);
      _currObj.getLayer().batchDraw();
    } else if(appConfig.mode == "draw-polygon" && _currObj instanceof SimShapes.Line) {
        let pos = appConfig.stage.getPointerPosition();
        const _stageScale = appConfig.stage.scale();
        pos.x = (pos.x - appConfig.stage.x()) / _stageScale.x;
        pos.y = (pos.y - appConfig.stage.y()) / _stageScale.y;

        _currObj.points([..._currObj.tempPoints, pos.x, pos.y]);
        _currObj.getLayer().batchDraw();
    }
  })
}

function setCurrentFocusedObject(appConfig, object) {
  if(object instanceof Shape && appConfig.stage.find('.' + object.name()).length) {
    const _newLayer = object.getLayer();

    removeAllTransformer(appConfig.stage);
    appConfig.layers.currentLayer = _newLayer;
    appConfig.currentFocusedObject = object;

    if(!["draw-line", "draw-polygon"].includes(appConfig.mode)) {
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