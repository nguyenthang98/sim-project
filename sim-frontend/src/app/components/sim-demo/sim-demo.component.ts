import { Component, OnInit } from '@angular/core';
import { CanvasUtilsService } from '../../services/canvas-utils.service';

@Component({
  selector: 'app-sim-demo',
  templateUrl: './sim-demo.component.html',
  styleUrls: ['./sim-demo.component.css']
})
export class SimDemoComponent implements OnInit {

  private stage: any;
  private containerId: string = 'konva-container';

  constructor(private canvasUtils: CanvasUtilsService) {
  }

  ngOnInit() {
  }

  createStage() {
    this.stage = this.canvasUtils.createStage(this.containerId);
  }
}
