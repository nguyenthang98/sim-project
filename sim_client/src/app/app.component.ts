import { Component } from "@angular/core";

import { AppControlPanelComponent } from "./components/sim-app-components/app-control-panel/app-control-panel.component";
import { AppTopPanelComponent } from './components/sim-app-components/app-top-panel/app-top-panel.component';
import { SimShapePropertiesComponent } from './components/sim-app-components/sim-shape-properties/sim-shape-properties.component';
import { SimColorPickerComponent } from './components/sim-app-components/sim-color-picker/sim-color-picker.component';
import { SimInputComponent } from './components/sim-app-components/sim-input/sim-input.component';
import { SimFilterComponent } from './components/sim-app-components/sim-filter/sim-filter.component';
import { SimExportDialogComponent } from './components/sim-app-components/dialogs/sim-export-dialog/sim-export-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  currentRoute: string;
  constructor(private spinner: NgxSpinnerService, private router: Router) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.spinner.show();
      }
      if (routerEvent instanceof NavigationEnd) {
        this.spinner.hide();
      }
    })
  }

  ngOnInit() {
    this.currentRoute = location.pathname;

    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
  }
}

export const SimComponents = [
  AppControlPanelComponent,
  AppTopPanelComponent,
  SimShapePropertiesComponent,
  SimFilterComponent,
  SimInputComponent,
  SimColorPickerComponent,
  SimExportDialogComponent
]

export const SimEntryComponents = [
  SimExportDialogComponent
]