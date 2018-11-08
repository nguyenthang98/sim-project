import { Component } from '@angular/core';
import { AppConfig } from 'src/app/models/app-config.model';

@Component({
  selector: 'app-sim-main-layout',
  templateUrl: './sim-main-layout.component.html',
  styleUrls: ['./sim-main-layout.component.css']
})
export class SimMainLayoutComponent {
  appConfig: AppConfig; 
  private containerId: string = "sim-work-area" + Date.now();

  constructor() { 
    this.appConfig = new AppConfig();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.appConfig.initStage(this.getContainerId());
    })
  }

  getContainerId(): string {
    return this.containerId;
  }
}
