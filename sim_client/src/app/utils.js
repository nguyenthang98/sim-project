import { Shape, Transformer } from "konva";

function registerStageOnClick (appConfig) {
  appConfig.stage.on("click tap", (event) => {
    if (event.target == appConfig.stage || event.target == appConfig.layers.backgroundLayer.bgRect) {
      removeAllTransformer(appConfig.stage);
      appConfig.currentFocusedObject = null;
      appConfig.stage.batchDraw();
    } else {
      if (event.target instanceof Shape) {
        const _newTransformer = new Transformer();
        const _targetLayer = event.target.getLayer();

        removeAllTransformer(appConfig.stage);
        appConfig.layers.currentLayer = _targetLayer;
        _targetLayer.add(_newTransformer);
        _newTransformer.attachTo(event.target);
        appConfig.currentFocusedObject = event.target;

        appConfig.stage.batchDraw();
      }
    }
  })
}

function removeAllTransformer (stage) {
  stage.find("Transformer").each(tr => { tr.destroy(); })
}

export { registerStageOnClick, removeAllTransformer };