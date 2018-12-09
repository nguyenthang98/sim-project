import { SimLayer } from "./sim-layer.model";
import { SimBgLayer } from "./sim-bg-layer.model";
import { removeAllTransformer } from "../utils";
export class LayerList {
  layerList: SimLayer[];
  backgroundLayer: SimBgLayer;
  currentLayer: SimLayer;
  
  constructor() {
    // background layer
    const backgroundProps = {
      name: "Background"
    }
    const bgLayer = new SimBgLayer(backgroundProps);
    const workingLayer = new SimLayer({name: "Working layer"});

    this.layerList = [workingLayer];
    this.currentLayer = workingLayer;
    this.backgroundLayer = bgLayer;
  }

  addLayer(layerName) {
    const newLayer = new SimLayer({
      name: layerName
    });
    this.layerList.unshift(newLayer);
    this.backgroundLayer.getStage().add(newLayer);
    return newLayer;
  }

  removeLayer(layer) {
    if(!layer) return;
    const layerIdx = this.layerList.findIndex(l => l == layer);
    if (layerIdx >= 0) {
      if (layer == this.currentLayer) {
        this.currentLayer = this.backgroundLayer;
        removeAllTransformer(this.currentLayer.getStage());
      }
      this.layerList.splice(layerIdx, 1);
    }

    layer.remove();
  }

  /* Layer positions management */
  isTopLayer(layer) {
    return this.layerList.findIndex(l => l == layer) == 0;
  }

  moveupLayer(layer) {
    const layerIdx = this.layerList.findIndex(l => l == layer);
    this.layerList.splice(layerIdx, 1);
    this.layerList.splice(layerIdx - 1, 0, layer);
  }

  isBottomLayer(layer) {
    return this.layerList.findIndex(l => l == layer) == (this.layerList.length - 1);
  }

  movedownLayer(layer) {
    const layerIdx = this.layerList.findIndex(l => l == layer);
    this.layerList.splice(layerIdx, 1);
    this.layerList.splice(layerIdx + 1, 0, layer);
  }

  exportJSON() {
    return {
      attrs: {
        backgroundLayer: this.backgroundLayer.exportJSON()
      },
      children: this.layerList.map(layer => layer.exportJSON()),
      className: 'LayerList'
    }
  }

  fromJSON(json) {
    // remove previous layers
    this.layerList.forEach(layer => {
      layer.destroy();
    });
    this.backgroundLayer.destroy();

    this.layerList = [];
    this.backgroundLayer = new SimBgLayer();
    this.backgroundLayer.fromJSON(json.attrs.backgroundLayer);

    json.children.forEach(layer => {
      console.log("load layer", layer);
      const newLayer = new SimLayer();
      newLayer.fromJSON(layer);
      this.layerList.unshift(newLayer);
    })
  }
} 