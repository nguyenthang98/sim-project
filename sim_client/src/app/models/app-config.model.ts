import { ColorAdjustments } from './color-adjustments.model';
import { LayerList } from './layer-list.model';

export class AppConfig {
  mainConfig: {
    width: number,
    height: number,
    backgroundColor: string
  }
  adjustments: ColorAdjustments;
  layers: LayerList;
  currentFocusedObject: any;

  constructor() {
    this.mainConfig = {
      width: 1080,
      height: 1080,
      backgroundColor: "rgba(255, 255, 255, 1)"
    }
    this.adjustments = new ColorAdjustments();
    this.layers = new LayerList(this.mainConfig);
    this.currentFocusedObject = null;
  }
}