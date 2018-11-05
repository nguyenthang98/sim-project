import { Component, Input } from '@angular/core';
import { AppConfig } from 'src/app/models/app-config.model';

@Component({
  selector: 'app-top-panel',
  templateUrl: './app-top-panel.component.html',
  styleUrls: ['./app-top-panel.component.css']
})
export class AppTopPanelComponent {
  @Input("app-config") appConfig: AppConfig;

  constructor() { }

  ngOnInit() {
  }

}
