import { SimLayer } from "./KonvaBasedModels/sim-layer.model";

export class LayerList {
  layerList: SimLayer[];
  backgroundLayer: SimLayer;
  currentLayer: SimLayer;
  
  // background layer
  bgLayer = new SimLayer({
    name: "Background"
  });

  // test layer
  layer1 = new SimLayer({
    name: "Layer 1"
  });
  layer2 = new SimLayer({
    name: "Layer 2"
  });

  constructor() {
    this.layerList = [this.layer1, this.layer2];
    this.currentLayer = this.bgLayer;
    this.backgroundLayer = this.bgLayer;
  }
} 