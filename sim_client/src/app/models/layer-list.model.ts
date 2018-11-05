import { SimLayer } from "./sim-layer.model";

export class LayerList {
  layerList: SimLayer[];
  backgroundLayer: SimLayer;
  currentLayer: SimLayer;
  
  constructor(config ?:any) {
    // background layer
    const backgroundProps = {
      name: "Background",
      fill: config.backgroundColor
    }
    const bgLayer = new SimLayer(backgroundProps);

    // test layer
    const layer1 = new SimLayer({
      name: "Layer 1",
    });
    const layer2 = new SimLayer({
      name: "Layer 2"
    });

    this.layerList = [layer1, layer2];
    this.currentLayer = bgLayer;
    this.backgroundLayer = bgLayer;
  }

  addLayer(layerName) {
    const newLayer = new SimLayer({
      name: layerName
    });

    this.layerList.unshift(newLayer);
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
  }

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