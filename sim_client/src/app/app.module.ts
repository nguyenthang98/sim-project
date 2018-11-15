import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent, SimComponents } from "./app.component";
import { AppRoutingModule, RoutingComponents } from "./modules/app-routing/app-routing.module";
import { AppMaterialModule } from "./modules/app-material/app-material.module";
import { SimApiService } from "./services/sim-api.service";
import { HttpClientModule } from "@angular/common/http";
import { CanvasUtilsService } from "./services/canvas-utils.service";
import { ColorPickerModule } from "ngx-color-picker";
import { PassValidatorDirective } from "./directives/pass-validator/pass-validator.directive";

@NgModule({
	declarations: [
		AppComponent,
		RoutingComponents,
		SimComponents,
		PassValidatorDirective
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		AppMaterialModule,
		ColorPickerModule,
		BrowserAnimationsModule
	],
	providers: [SimApiService, CanvasUtilsService],
	bootstrap: [AppComponent]
})
export class AppModule {}
