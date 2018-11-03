import { Layer } from "konva";

export class SimLayer extends Layer {
  showLayer: boolean;

  constructor(options) {
    super(options);
    this.showLayer = options.showLayer || true;
  }
}