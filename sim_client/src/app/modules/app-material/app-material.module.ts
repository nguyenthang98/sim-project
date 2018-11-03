import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatCheckboxModule, MatExpansionModule, MatSliderModule, MatRadioModule,
  MatListModule, MatButtonModule, MatTableModule, MatIconModule
} from "@angular/material";

const materialsComponents = [
  BrowserAnimationsModule, MatExpansionModule, MatSliderModule, MatRadioModule, MatCheckboxModule,
  MatListModule, MatButtonModule, MatTableModule, MatIconModule
]

@NgModule({
  imports: materialsComponents,
  exports: materialsComponents
})
export class AppMaterialModule { }
