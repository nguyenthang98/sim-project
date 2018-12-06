import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent, SimComponents, SimEntryComponents } from "./app.component";
import {
	AppRoutingModule,
	RoutingComponents
} from "./modules/app-routing/app-routing.module";
import { AppMaterialModule } from "./modules/app-material/app-material.module";
import { SimApiService } from "./services/sim-api.service";
import { HttpClientModule } from "@angular/common/http";
import { ColorPickerModule } from "ngx-color-picker";
import { PassValidatorDirective } from "./directives/pass-validator/pass-validator.directive";
import { SimUserCollectionComponent } from "./components/sim-user-collection/sim-user-collection.component";
import { AppNavBarComponent } from "./components/sim-app-components/app-nav-bar/app-nav-bar.component";

@NgModule({
	declarations: [
		AppComponent,
		RoutingComponents,
		SimComponents,
		PassValidatorDirective,
		SimUserCollectionComponent,
		AppNavBarComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		AppMaterialModule,
		ColorPickerModule,
		BrowserAnimationsModule,
	],
	providers: [SimApiService],
	entryComponents: [ SimEntryComponents ],
	bootstrap: [AppComponent],
})
export class AppModule { }
