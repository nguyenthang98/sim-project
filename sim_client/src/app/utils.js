import { Shape, Transformer } from "konva";

function registerStageOnClick (appConfig) {
  appConfig.stage.on("click tap", (event) => {
    if (event.target == appConfig.stage || event.target == appConfig.layers.backgroundLayer.bgRect) {
      removeAllTransformer(appConfig.stage);
      appConfig.currentFocusedObject = null;
      appConfig.stage.batchDraw();
    } else {
      setCurrentFocusedObject(appConfig, event.target);
    }
  })
}

function setCurrentFocusedObject(appConfig, object) {
  if(object instanceof Shape && appConfig.stage.find('.' + object.name()).length) {
    const _newTransformer = new Transformer();
    const _newLayer = object.getLayer();

    removeAllTransformer(appConfig.stage);
    appConfig.layers.currentLayer = _newLayer;
    _newLayer.add(_newTransformer);
    _newTransformer.attachTo(object);
    appConfig.currentFocusedObject = object;

  } else {
    removeAllTransformer(appConfig.stage);
    appConfig.currentFocusedObject = null;
  }
  appConfig.stage.batchDraw();
}

function removeAllTransformer (stage) {
  stage.find("Transformer").each(tr => { tr.destroy(); })
}

export { registerStageOnClick, removeAllTransformer, setCurrentFocusedObject };