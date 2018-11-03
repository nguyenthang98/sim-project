import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/models/app-config.model';

@Component({
  selector: 'app-sim-main-layout',
  templateUrl: './sim-main-layout.component.html',
  styleUrls: ['./sim-main-layout.component.css']
})
export class SimMainLayoutComponent implements OnInit {
  appConfig: AppConfig = new AppConfig(); 

  constructor() { }

  ngOnInit() {
  }

}
