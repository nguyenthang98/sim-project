import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { SimApiService } from './services/sim-api.service';
import { HttpClientModule } from '@angular/common/http';
import { CanvasUtilsService } from './services/canvas-utils.service';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    SimApiService,
    CanvasUtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
