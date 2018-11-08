import { SimLayer } from "./sim-layer.model";
import { SimBgLayer } from "./sim-bg-layer.model";

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
} 