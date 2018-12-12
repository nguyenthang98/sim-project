import { SimLayer } from "./sim-layer.model";
import { SimBgLayer } from "./sim-bg-layer.model";
import { removeAllTransformer } from "../utils";
import { get } from "lodash";

export class LayerList {
  layerList: SimLayer[];
  backgroundLayer: SimBgLayer;
  currentLayer: SimLayer;
  
  constructor(config?) {
    this.backgroundLayer = new SimBgLayer(get(config, 'attrs.backgroundLayer'));
    this.layerList = [];
    get(config, 'children', []).forEach(layerJson => {
      this.layerList.push(new SimLayer(layerJson));
    });
    this.currentLayer = this.backgroundLayer;
    /*
    // background layer
    const backgroundProps = {
      name: "Background"
    }
    const bgLayer = new SimBgLayer(backgroundProps);
    const workingLayer = new SimLayer({name: "Working layer"});

    this.layerList = [workingLayer];
    this.currentLayer = workingLayer;
    this.backgroundLayer = bgLayer;
    */
  }

  addLayer(layerName) {
    const newLayer = new SimLayer({
      attrs: {
        name: layerName
      }
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

  exportJSON() {
    return {
      attrs: {
        backgroundLayer: this.backgroundLayer.exportJSON()
      },
      children: this.layerList.map(layer => layer.exportJSON()),
      className: 'LayerList'
    }
  }

} 