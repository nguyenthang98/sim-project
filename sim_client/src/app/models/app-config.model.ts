import { ColorAdjustments } from './color-adjustments.model';
import { LayerList } from './layer-list.model';

export class AppConfig {
  adjustments: ColorAdjustments;
  layers: LayerList;

  constructor() {
    this.adjustments = new ColorAdjustments();
    this.layers = new LayerList();
  }
}