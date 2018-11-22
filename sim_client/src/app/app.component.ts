import { Component } from "@angular/core";

import { AppControlPanelComponent } from "./components/sim-app-components/app-control-panel/app-control-panel.component";
import { AppTopPanelComponent } from './components/sim-app-components/app-top-panel/app-top-panel.component';
import { SimShapePropertiesComponent } from './components/sim-app-components/sim-shape-properties/sim-shape-properties.component';
import { SimColorPickerComponent } from './components/sim-app-components/sim-color-picker/sim-color-picker.component';
import { SimInputComponent } from './components/sim-app-components/sim-input/sim-input.component';
import { SimFilterComponent } from './components/sim-app-components/sim-filter/sim-filter.component';

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    ngOnInit() { }
}

export const SimComponents = [
    AppControlPanelComponent,
    AppTopPanelComponent,
    SimShapePropertiesComponent,
    SimFilterComponent,
    SimInputComponent,
    SimColorPickerComponent
]