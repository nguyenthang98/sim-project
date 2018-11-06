import { ColorAdjustments } from './color-adjustments.model';
import { LayerList } from './layer-list.model';
import { Stage } from 'konva';
import { CanvasUtilsService } from '../services/canvas-utils.service';

export class AppConfig {
  mainConfig: {
    width: number,
    height: number,
    backgroundColor: string
  }
  adjustments: ColorAdjustments;
  layers: LayerList;
  currentFocusedObject: any;
  stage: Stage;

  constructor(private canvasUtils: CanvasUtilsService) {
    this.mainConfig = {
      width: 1080,
      height: 1080,
      backgroundColor: "rgba(255, 255, 255, 1)"
    }
    this.adjustments = new ColorAdjustments();
    this.layers = new LayerList(this.mainConfig);
    this.currentFocusedObject = null;
    this.stage = null;
  }

  initStage(containerId) {
    this.stage = this.canvasUtils.createStage(containerId, {width: this.mainConfig.width, height: this.mainConfig.height});

    // add all existed layer
    this.stage.add(this.layers.backgroundLayer);
    this.layers.layerList.forEach(l => {
      this.stage.add(l);
    });
  }
}